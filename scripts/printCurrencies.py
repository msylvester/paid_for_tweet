with open("digital-currency.csv", "rt") as in_file:
    text = in_file.read()
    d = text.splitlines()
print (text[1])
print(d)

currency = [line[:line.index(',')] for line in d]
print(currency)

with open("printable_list.csv", 'w') as file_handler:
    for item in currency:
        file_handler.write("{}\n".format(item))