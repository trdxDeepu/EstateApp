import React, { useState } from 'react'

const Profile = () => {

  const [formData , setFormData] = useState({
    name:"Depu",
    email:"singhdepu566@gmail.com"
  })

  return (
   <section>
    <h1 className='text-3xl text-center mt-6 font-serif font-bold'>My Profile</h1>
    <div>
      <form >
      <input type="text" 
      id="name"
      value={name}
      />
      </form>
    </div>
   </section>
  )
}

export default Profile