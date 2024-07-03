// Import the functions you need from the SDKs you need
import { getAnalytics, isSupported } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
	apiKey: 'AIzaSyCftEowCymNyZ3ODYgVYDTVEh4BMPcBBDY',
	appId: '1:615774210397:web:909e745a5129437d8040b4',
	authDomain: 'melcourses-2ad27.firebaseapp.com',
	measurementId: 'G-P67E0E97SZ',
	messagingSenderId: '615774210397',
	projectId: 'melcourses-2ad27',
	storageBucket: 'melcourses-2ad27.appspot.com',
}

const firebaseApp = initializeApp(firebaseConfig)

const analytics = (await isSupported()) ? getAnalytics(firebaseApp) : null

export { analytics }
