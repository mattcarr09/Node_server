var prompt = require('prompt');
var inquirer = require('inquirer');
var mysql = require('mysql');
var consoleTable = require('console.table');

var connection = mysql.createConnection({
     host: 'localhost',
     port: 3306,
     user: 'root',
     password: 'Mattmatt09!',
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

          inquirer.prompt([

          	{
          		type: "input",
          		message: "What is the id of the item you would like to buy?",
          		name: "id"
          	},

               {
          		type: "input",
          		message: "How many would you like to buy?",
          		name: "quantity"
          	}
      ]).then(function (order) {
          	//console.log(JSON.stringify(order, null, 2));
                    var quantity = order.quantity;
                    var itemId = order.id;
                    
                    connection.query('SELECT * FROM `products` WHERE `item_id`='+ itemId, function(err, selectedItem) {
                    	if (err) throw err;
                         if (selectedItem[0].stock_quantity - quantity >= 0) {
                              console.log("Bamazon's Inventory has enough of that item" + (selectedItem[0].product_name + "!"));
                              console.log("Quantity in Stock: " + selectedItem[0].stock_quantity + " Order Quantity: "+ quantity);
                              console.log("You will be charged "+ (order.quantity * selectedItem[0].price) +  " dollars.  Thank you for shopping at Bamazon.");
                             
                              connection.query('UPDATE `products` SET `stock_quantity`=? WHERE `item_id`=?', [selectedItem[0].stock_quantity - quantity, itemId, function (err, inventory) {
                              	if (err) throw err;
                                   showInventory();
                              }]
                            )}
                          })
                        })
                      })
                    }
                    showInventory();