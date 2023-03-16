import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Spinner from '../Components/Spinner'
import { db } from '../Firebase'

const Listing = () => {
    const [listing,setListing] = useState(null)
    const [loading,setLoading] = useState(true)
    const params = useParams()

    useEffect(()=>{

        async function fetchListing(){
            const docRef = doc(db,"listings",params.listingId)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
                setListing(docSnap.data())
                setLoading(false)
                

            }

        }
        fetchListing();
        

    },[params.listingID])

    if(loading){
        return <Spinner/>
    }

  return (
    <div>{listing.name}</div>
  )
}

export default Listing