const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-menu');
const logout = document.getElementById("logout")
var currentuser
const userlist = document.querySelector(".user-list")
menu.addEventListener('click', function(){
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
})

function fetchdata(){
    fetch(
        "http://stmapi-env-1.eba-ihzgwh9t.us-east-1.elasticbeanstalk.com/allUsers", 
    ).then(response=>{
        return response.json()
    }).then((data)=>{
        console.log(data);
        renderUser(data)
    })
}

fetchdata()

function renderUser(data){
    const user = data.map((user)=>{
        if(user.access == false){
            currentuser = user.email
            return `<li><p>Name:  ${user.name}</p><p>Email: ${user.email}</p><p>Phone Number: ${user.phoneNumber}</p><p>Address: ${user.address.street} ${user.address.city} ${user.address.state} ${user.address.pin}</p>
            <p>Access: Not verified </p><li><button id="verify">Verify</button><br><hr>`
        }
        else{
            return `<li><p>Name:  ${user.name}</p><p>Email: ${user.email}</p><p>Phone Number: ${user.phoneNumber}</p><p>Address: ${user.address.street} ${user.address.city} ${user.address.state} ${user.address.pin}</p>
            <p>Access: Verified</p><li><br><hr>`
        }
    }).join('')

    data.forEach((item,index) => {
        console.log(item.name, index);
    });
    userlist.insertAdjacentHTML("afterbegin", user)
    const btn = document.getElementById("verify")

    btn.addEventListener('click', (e)=>{
        e.preventDefault();
        fetch("http://stmapi-env-1.eba-ihzgwh9t.us-east-1.elasticbeanstalk.com/grantAccess",{
            method:"PATCH",
            body:new URLSearchParams({
                email: currentuser,
            }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
              },
        })
        userlist.innerHTML=""
        fetchdata()
    })

    logout.addEventListener('click', (e)=>{
        window.location.href="index.html"
    })
   
}