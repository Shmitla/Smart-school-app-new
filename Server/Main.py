import os
from flask import Flask, Response
import cv2
import face_recognition
import numpy as np

app = Flask(__name__)

# Load known face encodings and names
def load_known_faces(folder_path):
    known_encodings = []
    known_names = []
    for filename in os.listdir(folder_path):
        if filename.endswith('.jpg') or filename.endswith('.png'):
            image_path = os.path.join(folder_path, filename)
            image = face_recognition.load_image_file(image_path)
            face_encoding = face_recognition.face_encodings(image)
            if len(face_encoding) > 0:
                known_encodings.append(face_encoding[0])
                known_names.append(os.path.splitext(filename)[0])
    return known_encodings, known_names

known_encodings, known_names = load_known_faces('images')
if len(known_encodings) == 0:
    print("No faces found in the 'images' folder.")
    exit()

def recognize_faces(frame):
    # Find all face locations and encodings in the current frame
    face_locations = face_recognition.face_locations(frame)
    face_encodings = face_recognition.face_encodings(frame, face_locations)

    # Iterate through detected faces and compare with known faces
    for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
        # See if the face is a match for the known face(s)
        matches = face_recognition.compare_faces(known_encodings, face_encoding)
        name = "Unknown"
        distances = face_recognition.face_distance(known_encodings, face_encoding)
        # Check if there is a match
        best_match_index = np.argmin(distances)
        if matches[best_match_index]:
            name = known_names[best_match_index]

        # Draw rectangle and label around the face
        cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
        cv2.putText(frame, name, (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    return frame

def generate_frames():
    cap = cv2.VideoCapture(0)

    while True:
        success, frame = cap.read()
        if not success:
            break
        else:
            frame = recognize_faces(frame)
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/')
def index():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)
