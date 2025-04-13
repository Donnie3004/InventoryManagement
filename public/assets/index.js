// document.addEventListener('DOMContentLoaded', function(){
//   var deleteProductBtn = document.getElementsByClassName('delete-product-button');

// })
const handleDeleteProductBtn = async (id) => {
  console.log(id);
  if(window.confirm('Are you sure you wanna delete the product ?') == false){
    console.log('inside if');
    return;
  }
  console.log('outside if....');
  try {
      let resp = await fetch(`delete-product/${id}`, {
      method:'DELETE'
    });
    let data =await resp.json();
    console.log("data : ", data);
    if(!data.success){
      console.error("Error Occured : ", data.errorMsg);
      window.alert(data.errorMsg);
      return;
    }
    window.location.reload();// Means please refresh my code.
  } catch (error) {
    console.error(error);
    window.alert('Internal Server Error..!');
  }
} 