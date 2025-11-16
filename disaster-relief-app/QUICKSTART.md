# 🚀 Quick Start Guide

## Your application is now running!

### 🌐 Access the Application

**Frontend (User Interface):**
- URL: http://localhost:8080
- Open this in your web browser

**Backend (API Server):**
- URL: http://localhost:3000
- Handles all calculations

---

## ✅ What's Working

### Backend Server (Port 3000)
✓ Express.js REST API
✓ 0/1 Knapsack Dynamic Programming Algorithm
✓ CORS enabled for frontend communication
✓ 5 Disaster types with default resources
✓ Real-time calculation endpoint

### Frontend Server (Port 8080)
✓ Responsive UI matching the reference design
✓ Disaster type selector
✓ Resource management (add/edit/delete)
✓ Capacity control
✓ Real-time results display
✓ Algorithm performance metrics

---

## 🎮 How to Use

1. **Open your browser** and go to: http://localhost:8080

2. **Select a disaster type** from the left sidebar:
   - Flood 💧
   - Earthquake 🏚️
   - Wildfire 🔥
   - Hurricane 🌪️
   - Landslide ⛰️

3. **Adjust the capacity** (default: 100 kg)

4. **Modify resources**:
   - Edit resource names, values, or weights
   - Delete resources with the 🗑️ button
   - Add new resources with the "Add Resource" button

5. **View results** in real-time on the right panel:
   - Total Value
   - Total Weight
   - Capacity Used
   - Selected items (highlighted in green)
   - Algorithm performance metrics

---

## 📁 Project Structure

```
disaster-relief-app/
│
├── backend/                         # Node.js/Express API
│   ├── server.js                   # Main server file
│   ├── package.json                # Dependencies
│   ├── routes/                     # API routes
│   │   ├── knapsack.js            # Knapsack endpoints
│   │   └── disasters.js           # Disaster endpoints
│   └── controllers/                # Business logic
│       ├── knapsackController.js  # 0/1 Knapsack algorithm
│       └── disasterController.js  # Disaster data
│
├── frontend/                        # HTML/CSS/JS UI
│   ├── index.html                  # Main page
│   ├── styles.css                  # Styling
│   └── app.js                      # Frontend logic
│
├── start.sh                         # Linux/Mac startup script
├── start.bat                        # Windows startup script
└── README.md                        # Documentation
```

---

## 🔧 Manual Start (If needed)

### Start Backend:
```bash
cd backend
npm install  # First time only
node server.js
```

### Start Frontend:
```bash
cd frontend
python3 -m http.server 8080
```

Or use the quick start script:
```bash
./start.sh  # Linux/Mac
```

---

## 🧮 Algorithm Details

### 0/1 Knapsack (Dynamic Programming)

**Problem:** Given items with values and weights, select items to maximize value without exceeding capacity.

**Constraint:** Each item can only be taken once (0/1 - all or nothing).

**Time Complexity:** O(n × W)
- n = number of items
- W = capacity

**Space Complexity:** O(n × W)

**Implementation:**
1. Create DP table: `dp[i][w]` = max value using first i items with capacity w
2. Fill table using recurrence relation
3. Backtrack to find selected items

---

## 🧪 Test the API (Optional)

### Get all disasters:
```bash
curl http://localhost:3000/api/disasters
```

### Get specific disaster:
```bash
curl http://localhost:3000/api/disasters/flood
```

### Calculate knapsack:
```bash
curl -X POST http://localhost:3000/api/knapsack/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {"name": "Item 1", "value": 100, "weight": 10},
      {"name": "Item 2", "value": 200, "weight": 20}
    ],
    "capacity": 50
  }'
```

---

## 🛑 Stop the Application

Press `Ctrl+C` in both terminal windows to stop the servers.

Or kill the processes:
```bash
pkill -f "node server.js"
pkill -f "http.server 8080"
```

---

## 💡 Tips

- **Refresh the browser** if you don't see changes
- **Check the browser console** (F12) for any errors
- **Ensure both servers are running** before using the app
- **Port already in use?** Kill the process or change ports in the code

---

## 🎯 Features Implemented

✅ Full-stack architecture (Frontend + Backend)
✅ RESTful API design
✅ 0/1 Knapsack Dynamic Programming
✅ 5 Disaster scenarios with pre-loaded data
✅ Real-time calculations via API
✅ Responsive UI design
✅ Add/Edit/Delete resources dynamically
✅ Performance metrics display
✅ Error handling and validation
✅ Clean, maintainable code structure

---

Enjoy optimizing disaster relief resources! 🎉
