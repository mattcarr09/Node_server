var prompt = require('prompt');
var inquirer = require('inquirer');
var mysql = require('mysql');


var connection = mysql.createConnection({
     host: 'localhost',
     port: 3306,
     user: 'root',
     password: '',
     database: "bamazon_db"
});

connection.connect(function(err) {
     if (err) throw err;
     console.log("connected as id " + connection.threadId);
});

function showInventory() {
     connection.query('SELECT * FROM products', function(err, inventory) {
          if (err) throw err;
          console.log("Bamazon's Inventory");
          console.table('products', inventory);
    
          })

inquirer.prompt([

	{
		type: "list",
		message: "Select an action",
		choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
		name: "selection"
	}


     ]).then(function (user) {
          switch(user.selection) {
               case "View Products for Sale":
               showInventory();
               break;
            
               case "View Low Inventory":
               connection.query('SELECT * FROM products WHERE stock_quantity < 5', function(err, inventory) {
                    if (err) throw err;
                    console.log("Bamazon's Inventory");
                    console.table(inventory);
               break;
               })            
               case "Add to Inventory":
               inquirer.prompt([
               	{
               		type: "input",
               		message: "What is the id of the item you would like to add to?",
               		name: "itemId"
               	},
                    {
               		type: "input",
               		message: "How many items should we add to the inventory of that item?",
               		name: "amount"
               	}
            
          ]).then(function (request) {
            
                    connection.query('SELECT * FROM products WHERE item_id=' + request.itemId, function(err, selectedItem) {
                    	if (err) throw err;
                              console.log("You have added "+ request.amount + " " + selectedItem[0].product_name + " to the inventory.");
                             
                              connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', [selectedItem[0].stock_quantity + Number(request.amount), request.itemId],function(err, inventory) {
                              	if (err) throw err;
                                   showInventory();
                              });  
                    });
               }); 
               break;

               case "Add New Product":
               inquirer.prompt([
                    {
                         type: "input",
                         message: "What name of the product you would like to add?",
                         name: "ProductName"
                    },
                    {
                         type: "input",
                         message: "What department does this item belong in?",
                         name: "DepartmentName"
                    },
                    {
                         type: "input",
                         message: "What is the price of the item you would like to add to the inventory?",
                         name: "Price"
                    },
                    {
                         type: "input",
                         message: "How many items should we add to the inventory of that item?",
                         name: "StockQuantity"
                    }
          ]).then(function (newItem) {
               connection.query("INSERT INTO products (ProductName, DepartmentName, Price, StockQuantity) VALUES (?,?,?,?)",[newItem.ProductName, newItem.DepartmentName, newItem.Price, newItem.StockQuantity],
               function(err, inventory) {
                    if (err) throw err;
                    console.log("Great, "+ newItem.ProductName+ " have been added to the inventory.");
                    
             });
          });
       } 
   });
} showInventory();