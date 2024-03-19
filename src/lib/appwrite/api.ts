import { INewUser } from '@/types'
import { account, appwriteConfig, avatars, databases } from './config'
import { ID, Query } from 'appwrite'

export async function createUserAccount(user: INewUser) {
 try {
  const newAccount = await account.create(
   ID.unique(),
   user.email,
   user.password,
   user.name,
  )

  if (!newAccount) throw Error

  const avatarUrl = avatars.getInitials(user.name)
  const newUser = await saveUserToDB({
   accountId: newAccount.$id,
   name: newAccount.name,
   email: newAccount.email,
   userName: user.username,
   imageUrl: avatarUrl,
  })

  return newUser
 } catch (error) {
  console.log(error)
 }
}

export async function saveUserToDB(user: {
 accountId: string
 email: string
 name: string
 imageUrl: URL
 userName?: string
}) {
 try {
  const newUser = await databases.createDocument(
   appwriteConfig.databaseId,
   appwriteConfig.userCollectionId,
   ID.unique(),
   user,
  )

  return newUser
 } catch (error) {
  console.log(error)
 }
}

export async function signInAccount(user: { email: string; password: string }) {
 try {
  const session = await account.createEmailPasswordSession(
   user.email,
   user.password,
  )
 } catch (error) {
  console.log(error)
 }
}

export async function getAccount() {
 try {
  const currentAccount = await account.get()

  return currentAccount
 } catch (error) {
  console.log(error)
 }
}

export async function getCurrentUser() {
 try {
  const currentAccount = await getAccount()
  if (!currentAccount) throw Error

  const currentUser = await databases.listDocuments(
   appwriteConfig.databaseId,
   appwriteConfig.userCollectionId,
   [Query.equal('accountId', currentAccount.$id)],
  )

  console.log(currentUser, 'getCurrentUser')

  if (!currentUser) throw Error

  return currentUser.documents[0]
 } catch (error) {
  console.log(error)
 }
}
