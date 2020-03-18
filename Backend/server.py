from flask import Flask
from flask import request
import csv
import json
app = Flask(__name__)


@app.route("/create", methods = ["POST"])
def create():
    item = request.json["item"]
    quantity = request.json["quantity"]
    purchased = request.json["purchased"]

    with open("data/groceries.csv", "a") as csvfile:
        fieldnames = ["item", "quantity", "purchased"]
        writer = csv.DictWriter(csvfile, fieldnames = fieldnames)
        # writer.writeheader()
        writer.writerow({"item": item, "quantity": quantity, "purchased": purchased})

    return json.dumps({"message": "Item added successfully"})


@app.route("/listing", methods = ["GET"])
def listing():
    items = list()
    with open("data/groceries.csv", "r") as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            items.append(row)

    return json.dumps({"Items": items})


@app.route("/edit/<item_no>", methods = ["POST"])
def edit(item_no):
    item = request.json["item"]
    quantity = request.json["quantity"]
    items = list()
    with open("data/groceries.csv", "r") as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            items.append(row)
        for i in range(len(items)):
            if i == int(item_no) - 1:
                items[i]["item"] = item
                items[i]["quantity"] = quantity
            else:
                continue
    with open("data/groceries.csv", "w") as csvfile:
        fieldnames = ["item", "quantity", "purchased"]
        writer = csv.DictWriter(csvfile, fieldnames = fieldnames)
        writer.writeheader()
        for ele in items:
            writer.writerow(ele)

    return json.dumps({"message": "List Updated"})


@app.route("/delete/<item_no>", methods = ["POST"])
def delete(item_no):
    item_no = request.json["item_no"]
    items = list()
    with open("data/groceries.csv", "r") as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            items.append(row)
        for i in range(len(items)):
            if i == int(item_no) - 1:
                items.pop(i)
                break
    with open("data/groceries.csv", "w") as csvfile:
        fieldnames = ["item", "quantity", "purchased"]
        writer = csv.DictWriter(csvfile, fieldnames = fieldnames)
        writer.writeheader()
        for ele in items:
            writer.writerow(ele)

    return json.dumps({"message": "Item Deleted"})


@app.route("/purchased", methods = ["POST", "GET"])
def purchased():
    if request.method == "POST":
        item_no = request.json["item_no"]
        items = list()
        with open("data/groceries.csv", "r") as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                items.append(row)
            for i in range(len(items)):
                if i == int(item_no) - 1:
                    items[i]["purchased"] = "true"
                    break
        with open("data/groceries.csv", "w") as csvfile:
            fieldnames = ["item", "quantity", "purchased"]
            writer = csv.DictWriter(csvfile, fieldnames = fieldnames)
            writer.writeheader()
            for ele in items:
                writer.writerow(ele)

        return json.dumps({"message": "Item Purchased"})
    
    elif request.method == "GET":
        items = list()
        with open("data/groceries.csv", "r") as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                if row["purchased"] == "true":
                    items.append(row)
            print(items)

        return json.dumps(items)



