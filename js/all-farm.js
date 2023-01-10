var id = document.getElementById('id');  
    var farmName = document.getElementById('farmName');  
    var Status = document.getElementById('Status');  
    var image = document.getElementById('image');  
    var location = document.getElementById('location'); 
    var results = document.getElementById('details');  
 
var db = openDatabase("MYDATABASE", "1.0", "MYDB", 4 * 1024 * 1024);  
var mydata;  
CreateTable();  
function CreateTable() {  
      db.transaction(function (tx) {  
          tx.executeSql("create table if not exists Emp (id INTEGER PRIMARY KEY AUTOINCREMENT, farmName TEXT,Status TEXT,image FILE,location TEXT)");  
      });  
} 

function ShowData() {  
        results.innerHTML = '';  
        db.transaction(function (tx) {  
            tx.executeSql("SELECT * FROM Emp", [], function (tx, result) {  
                mydata = result.rows;  
                for (var i = 0, item = null; i < mydata.length; i++) {  
                    item = mydata.item(i);  
                    results.innerHTML +=  
                    '<b>Farm name : </b>' + item['farmName'] + ' , ' + '<b>Status :</b> ' + item['Status'] + ' , ' + '<b>Image</b>' + item['image'] + ' , ' + '<b>Location :</b>' + item['location'] + '      <img height="20" width="20" src="Edit.jpg" onclick="LoadMyData(' + i +  ')" />' +  
                    '<img height="20" width="20" src="delete.jpg" onclick="deleteRecord(' + item['id'] + ')" /><br/>';  
                }  
            });  
        });  
    } 

function LoadMyData(i) {  
     var item = mydata.item(i);  
     farmName.value = item['farmName'];  
     Status.value = item['Status'];  
     image.value = item['image'];  
     location.value = item['location']; 
     id.value = item['id'];  
 } 
function deleteData(id) {  
      var deleteStatement = "delete from Emp where id=?";  
      db.transaction(function (tx) {  
          tx.executeSql(deleteStatement, [id], ShowData(), ShowErrorMessage);  
      });  
     ClearData();  
}   
function ClearData() {  
    farmName.value = '';  
    Status.value = '';  
    image.value = '';  
    location.value = ''; 
     id.value = '';  
} 
  
  
function InsertData() {  
      var insertStatement = "insert into Emp (farmName, Status, image, location) values (?, ?, ?,?)";  
      db.transaction(function (tx) {   
          tx.executeSql(insertStatement, [farmName.value, Status.value, image.value, location.value], showdatacleardata, ShowErrorMessage);  
     });  
} 
function UpdateData() {  
      var updateStatement = "UPDATE Emp SET farmName =?, Status =?, image=?, location=? WHERE id = ?";  
      db.transaction(function (tx) {   
          tx.executeSql(updateStatement, [farmName.value, Status.value, image.value, location.value, id.value], showdatacleardata, ShowErrorMessage);  
      });  
} 
