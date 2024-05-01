import React from 'react'
import Layout from '../components/Layout'
import { Text } from 'react-native'
import AdminComponent from '../components/AdminComponent'

export default function Profile({ navigation }) {
  return( <Layout navigation={navigation}>
  <AdminComponent/>
  </Layout>
)}
