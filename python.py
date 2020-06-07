# import serial 
# import numpy as np

# ser = serial.Serial('COM3', 9600)

# # initiate array
# array = np.zeros((3, 3, 3), dtype = np.int8)

# # fill array
# array [0:, 1, 1] = 1

# # light 
# string = ''
# for x in range(3):
#     for y in range(3):
#         string += np.array2string(array[x, y, 0:], separator='')

# string = string.replace('[', '')
# string = string.replace(']', '')
# string += '\n'
# string = string.encode("utf-8")

# while True: 
#     ser.write(string)      


import serial
import numpy as np
ser = serial.Serial('COM3', 9600)
item = np.ones((3, 3, 3), dtype = np.int8)
string = ''
for x in range(3):
	for y in range(3):
		string += np.array2string(item[x, y, 0:], separator='')
string = string.replace('[', '')
string = string.replace(']', '')
string += '\n'
string = string.encode("utf-8")
while True:
	ser.write(string)

