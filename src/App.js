import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';


function App() {

  //Üyeleri tutan bir state oluşturduk.
  const [memberList, setMemberList] = useState([]);

  //Editlenen üyeleri tutan bir state oluşturduk.
const [editedMember, setEditedMember] = useState();



  //editleme için bir fonksiyon yazalım. memberList'i maplesin, içindeki belirli bir id'ye sahip olan üyenin güncellenmiş bir versiyonuyla değiştirilmesini sağlasın. Eğer member.id ile mevcut üyenin (m) id'si eşleşirse, o üye güncellenir; aksi takdirde, mevcut üye olduğu gibi korunur. sonra bu fonksiyonu Form component'ine props olarak gönderelim.
  const editingMember = (member) => {
    setMemberList(
      memberList.map(m => {
      if (member.id === m.id){
        return member;
      } else {
        return m;
      }
    })
    )  
  }; 

  //Yeni üye eklemek için bir callback fonksiyonu oluşturduk. Bunu Form component'ine props olarak göndereceğiz ki, submit butonuna tıklandığında bu fonksiyonu tetiklesin.
  const addMember = (newMember) => {
    setMemberList([...memberList, newMember]); //mevcut memberList'i al, ona yeni gelen üyeyi ekleyip, state'i güncelle.
    console.log("new member data > ", newMember); 
  };



  return (
    <div className="App">
      {/* header ve member-card class'ı alan bir div oluşturuyoruz, oluşturacağımız tablonun sütun başlıkları için: */}
        <div className='member-card header'>
        <div>İsim </div>
        <div>Email </div>
        <div>Rol </div>
        <div>Aksiyon </div>
      </div> 
    {memberList.map((member) => (//memberList'i map'ledik, her bir member için, o member'ın ismi, emaili ve rolünü(yani formData state'ine gelen  dataları) dinamik bir şekilde render eden bir div yazalım: 
      <div className='member-card'>
        <div>{member.name}</div>
        <div>{member.email}</div>
        <div>{member.role}</div>
        <div>
          <button onClick= {() => setEditedMember(member)}>Düzenle</button> 
        </div>
      </div> 
    ))} 
    <Form addMember={addMember} editingMember={editingMember} editedMember={editedMember} />
    </div>
  );
  }

export default App;
