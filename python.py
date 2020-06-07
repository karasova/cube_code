import serial 
import numpy as np

ser = serial.Serial('COM3', 9600)

def make_str(array):
    string = ''
    for x in range(3):
        for y in range(3):
            string += np.array2string(array[x, y, 0:], separator='')

    string = string.replace('[', '')
    string = string.replace(']', '')
    string += '\n'
    string = string.encode("utf-8")
    return string



array = np.zeros((3, 3, 3), dtype = np.int8)

array [0:, 1, 1] = 1

# a = "101111011100110111101010111\n"
final = make_str(array)
last = ' '

while True: 
    ser.write(final)      

