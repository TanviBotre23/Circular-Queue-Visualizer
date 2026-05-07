class CircularQueue {
    constructor(size) {
        this.queue = new Array(size).fill(null);
        this.size = size;
        this.front = -1;
        this.rear = -1;
    }

    isFull() {
        return (this.rear + 1) % this.size === this.front;
    }

    isEmpty() {
        return this.front === -1;
    }

    enqueue(value) {
        if (this.isFull()) return false;
        if (this.isEmpty()) this.front = 0;
        this.rear = (this.rear + 1) % this.size;
        this.queue[this.rear] = value;
        return true;
    }

    dequeue() {
        if (this.isEmpty()) return null;
        const val = this.queue[this.front];
        this.queue[this.front] = null;

        if (this.front === this.rear)
            this.front = this.rear = -1;
        else
            this.front = (this.front + 1) % this.size;

        return val;
    }
}

/* DOM */
const queueDisplay = document.getElementById("queueDisplay");
const frontIndex = document.getElementById("frontIndex");
const rearIndex = document.getElementById("rearIndex");
const message = document.getElementById("message");

let queue = null;

/* DRAW */
function updateDisplay() {
    queueDisplay.innerHTML = "";
    if (!queue) return;

    const size = queueDisplay.clientWidth;
    const center = size / 2;
    const elemRadius = 110;
    const indexRadius = 145;

    for (let i = 0; i < queue.size; i++) {
        const angle = (2 * Math.PI / queue.size) * i - Math.PI / 2;
        const x = indexRadius * Math.cos(angle) + center - 10;
        const y = indexRadius * Math.sin(angle) + center - 10;

        const label = document.createElement("div");
        label.className = "index-label";
        label.style.left = `${x}px`;
        label.style.top = `${y}px`;
        label.textContent = `[${i}]`;
        queueDisplay.appendChild(label);
    }

    queue.queue.forEach((val, idx) => {
        if (val === null) return;

        const angle = (2 * Math.PI / queue.size) * idx - Math.PI / 2;
        const x = elemRadius * Math.cos(angle) + center - 22;
        const y = elemRadius * Math.sin(angle) + center - 22;

        const el = document.createElement("div");
        el.className = "queue-element";
        if (idx === queue.front) el.classList.add("front");
        if (idx === queue.rear) el.classList.add("rear");

        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.textContent = val;
        queueDisplay.appendChild(el);
    });

    frontIndex.textContent = queue.front;
    rearIndex.textContent = queue.rear;
}

/* EVENTS */
document.getElementById("createQueueBtn").onclick = () => {
    const size = parseInt(document.getElementById("queueSizeInput").value);
    if (size < 3) return;
    queue = new CircularQueue(size);
    document.querySelector(".action-controls").style.display = "flex";
    message.textContent = `Queue of size ${size} created`;
    updateDisplay();
};

document.getElementById("enqueueBtn").onclick = () => {
    const val = document.getElementById("valueInput").value;
    message.textContent = queue.enqueue(val) ? `${val} enqueued` : "Queue Overflow";
    document.getElementById("valueInput").value = "";
    updateDisplay();
};

document.getElementById("dequeueBtn").onclick = () => {
    const val = queue.dequeue();
    message.textContent = val === null ? "Queue Underflow" : `${val} dequeued`;
    updateDisplay();
};

document.getElementById("resetBtn").onclick = () => {
    queue = new CircularQueue(queue.size);
    message.textContent = "Queue reset";
    updateDisplay();
};