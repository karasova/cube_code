#define CUBE_SIZE 3

int cube[CUBE_SIZE][CUBE_SIZE]={
    {A5, 6, 7},
    {A2, A3, A4},
    {A1, A0, 12}
};

int layers[CUBE_SIZE] = {2, 3, 5};

String data;

void setup() { 
  Serial.begin(9600);
 for (int i = 0; i < CUBE_SIZE; i++) {
     
     for (int j = 0; j < CUBE_SIZE; j++) {
         pinMode(cube[i][j], OUTPUT);
     }
 }
}


void light() {
    for (int i = 0; i < CUBE_SIZE; i++) {
        lightLayer(i);
    }
}

void switchOff() {
    for (int i = 0; i < CUBE_SIZE; i++) {
        switchOffLayer(i);
    }
}

void lightLayer(int z) {
    pinMode(layers[z], OUTPUT);    
     for (int i = 0; i < CUBE_SIZE; i++) {
        for (int j = 0; j < CUBE_SIZE; j ++) {
            digitalWrite(cube[i][j], HIGH);
        }  
    }  
}

void switchOffLayer (int z) {
    pinMode(layers[z], INPUT);    
     for (int i = 0; i < CUBE_SIZE; i++) {
        for (int j = 0; j < CUBE_SIZE; j ++) {
            digitalWrite(cube[i][j], LOW);
        }  
    } 
}

void lightCubeDelay (int delay_time) {  
    for (int i = 0; i < CUBE_SIZE; i++) {
        lightLayer(i);
        delay (delay_time);
        switchOffLayer(i);  
    }  
}

int array[CUBE_SIZE][CUBE_SIZE][CUBE_SIZE] ;


void lightLayerArray (int array[CUBE_SIZE][CUBE_SIZE][CUBE_SIZE]) {    
    for (int x = 0; x < CUBE_SIZE; x++) {
        pinMode(layers[x], OUTPUT); 
        for (int y = 0; y < CUBE_SIZE; y++) {
            for (int z = 0; z < CUBE_SIZE; z++) {

                switch (array[x][y][z]) {
                    case 1:
                        digitalWrite (cube[y][z], HIGH);
                        break;
                    
                    default:
                        digitalWrite (cube[y][z], LOW);
                        break;
                }
            }
        }
        switchOffLayer(x);
    }
}

bool checkArray() {
    bool flag = true;
    for (int x = 0; x < CUBE_SIZE; x++) {        
        for (int y = 0; y < CUBE_SIZE; y++) {
            for (int z = 0; z < CUBE_SIZE; z++) {
                if (array [x][y][z] == NULL) {
                    flag = false;
                }
            }
        }
    }
    if (flag) {
        return true;
    }
    return false;
}



bool getArray() {
    if (Serial.available() > 0) {
        data = Serial.readStringUntil('\n');   

        if (data.length() == 27) {
            int position = 0;
            for (int x = 0; x < CUBE_SIZE; x++) {        
                for (int y = 0; y < CUBE_SIZE; y++) {
                    for (int z = 0; z < CUBE_SIZE; z++) {
                        array[x][y][z] = data.charAt(position) - '0';
                        position++;
                    }
                }
            }
            if (checkArray) 
                return true;
        }
        else 
            return false;       

    }

    
}

void loop() {    

    getArray();
    lightLayerArray(array);

}