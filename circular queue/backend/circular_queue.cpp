#include <iostream>
using namespace std;

#define SIZE 5
int queue[SIZE];
int front = -1;
int rear = -1;

void enqueue(int value) {
    if ((front == 0 && rear == SIZE - 1) || (rear == (front - 1 + SIZE) % SIZE)) {
        cout << "Queue Overflow\n";
        return;
    }
    if (front == -1) front = rear = 0;
    else if (rear == SIZE - 1 && front != 0) rear = 0;
    else rear++;
    queue[rear] = value;
    cout << value << " enqueued.\n";
}

void dequeue() {
    if (front == -1) {
        cout << "Queue Underflow\n";
        return;
    }
    cout << queue[front] << " dequeued.\n";
    if (front == rear) front = rear = -1;
    else if (front == SIZE - 1) front = 0;
    else front++;
}

void display() {
    if (front == -1) { cout << "Queue is empty\n"; return; }
    cout << "Queue: ";
    if (rear >= front) for (int i = front; i <= rear; i++) cout << queue[i] << " ";
    else {
        for (int i = front; i < SIZE; i++) cout << queue[i] << " ";
        for (int i = 0; i <= rear; i++) cout << queue[i] << " ";
    }
    cout << "\n";
}

int main() {
    int choice, val;
    while (true) {
        cout << "\n1.Enqueue 2.Dequeue 3.Display 4.Exit\nChoice: ";
        cin >> choice;
        switch (choice) {
            case 1:
                cout << "Value: "; cin >> val;
                enqueue(val);
                break;
            case 2:
                dequeue();
                break;
            case 3:
                display();
                break;
            case 4:
                return 0;
            default:
                cout << "Invalid choice\n";
        }
    }
}