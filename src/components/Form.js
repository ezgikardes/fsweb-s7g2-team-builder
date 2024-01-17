import { useEffect, useState } from "react";





export default function Form({ addMember, editingMember, editedMember }) {
  const [memberData, setMemberData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const submitHandler = (e) => {
    e.preventDefault(); //form submit edildiğinde default davranış olan sayfayı yenilemeyi engelle.
    if (memberData.id) { 
        editingMember(memberData); //bu koşulu edit için son aşamada ekliyoruz. Eğer memberData.id varsa, yani zaten bir üye düzenleniyorsa, editingMember çalışmalı.
    } else { //değilse yeni üye eklenmeli, addMember çalışmalı.
        addMember({...memberData, id: Math.round(Math.random() * 9999999)}); //submit ettiğimde, form için tuttuğumuz datayı (memberData), yeni bir id vererek addMember prop'u aracılığıyla App'teki aynı isimli callback fonksiyonuna gönder.
    }
    setMemberData({
        name: "",
        email: "",
        role: "",
      }) //submit ettiğimde formData'yı sıfırla. ama bunun çalışması için aşağıda inputları controlled hale getirdik. value propuna state'i bağladık.
  };


  useEffect(() => {
    if(editedMember){
        setMemberData(editedMember);
    }}, [editedMember]) //editedMember state'i değiştiğinde, yani bir edit butonuna basıldıysa, bu useEffect çalıştırılacak. Eğer editedMember'ın içinde bir data varsa, bu datayı memberData'nın içerisine setle dedik.  böylece, düzenle butonuna basıldığında, söz konusu data inputların içine dolacak.


  return (
    <form onSubmit={submitHandler} className="member-form">
    <h2>
        {memberData.id ? `${memberData.name} kaydını güncelle` : "Yeni kayıt oluştur"} 
    </h2> 
    <hr style={{marginBottom:"1.5rem"}} />
      <div>
        <label>
          <span>
            Üye adı:
          </span>
          <input
            type="text"
            onChange={(e) => {
              setMemberData({ ...memberData, name: e.target.value });
            }} //input'taki değişikliği state'e yaz dedik.
            value={memberData.name} //input'un value prop'unu, memberData state'inin name alanına eşitledik, state'teki  değişikliği inputa yaz dedik. 
          />
        </label>
      </div>
      <div>
        <label>
           <span>
            Üye email:
           </span>
          <input
            type="email"
            onChange={(e) => {
              setMemberData({ ...memberData, email: e.target.value });
            }}
            value={memberData.email} 
          />
        </label>
      </div>
      <div>
        <label>
           <span>
            Üye rolü:
           </span>
          <input
            type="text"
            onChange={(e) => {
              setMemberData({ ...memberData, role: e.target.value });
            }}
            value={memberData.role} 
          />
        </label>
      </div>

      <button type="submit" disabled={!(memberData.name && memberData.email)}>Gönder</button>
      {/* bu buton, tıklandığında yukarıdaki submitHandler vesilesiyle App'e giderek addMember callback fonksiyonunu tetikleyecek, memberList state'i güncellenecek ve map'le yeniden render edilecek. */}
    </form>
  );
}

//not: return kısmında bir form döndürdüğümüz için, button'a onClick eklememize gerek kalmıyor. type'ına submit vermemiz, tıkladığımızda form'un onSubmit'inin çalışması için yeterli.

//not: 19. satırdaki kodu, edit fonksiyonunda kullanmak üzere, bir id yaratmak için en son aşamada ekledik. başkasıyla çakışmayacak eşsiz bir id için math.random() metdunu kullandık.

//not: 80. satırda buton'daki disabled propu ekledik. disable'ı, input'lardaki name ve email yoksa true yap yani aktif et dedik. varsa false yap. 

//not: 37. satırda, 