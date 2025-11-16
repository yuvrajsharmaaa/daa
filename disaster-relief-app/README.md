# Disaster Relief Resources Distributer
## 0/1 Knapsack Algorithm Implementation

---

**Submitted by:**

**Team Members:**
1. Student A
2. Student B
3. Student C

**Under the Guidance of:**
Faculty Name: Dr. XYZ

**Department of Computer Science and Engineering**  
**Manav Rachna International Institute of Research and Studies**

**Academic Year:** 2025–2026

---

## ABSTRACT

The Disaster Relief Resources Distributer is a full-stack web application designed to optimize the allocation of emergency resources during disaster situations using the 0/1 Knapsack algorithm. The system employs Dynamic Programming to maximize the total value of resources while adhering to weight capacity constraints. It features a RESTful API backend built with Node.js and Express, and a responsive frontend interface that allows real-time resource management and allocation visualization. This project demonstrates the practical application of algorithm design, web development, and database management principles to solve real-world optimization problems in disaster management scenarios.

---

## INTRODUCTION

Disaster relief operations require efficient allocation of limited resources to maximize their impact. The 0/1 Knapsack problem is a classic optimization problem in computer science and operations research, where items with specific values and weights must be selected to maximize total value without exceeding capacity constraints.

This project implements the 0/1 Knapsack algorithm using Dynamic Programming with O(n×W) time complexity to solve resource allocation challenges across five disaster scenarios: Flood, Earthquake, Wildfire, Hurricane, and Landslide. The system provides a practical demonstration of how theoretical algorithmic concepts can be applied to critical real-world problems in emergency management and humanitarian aid distribution.

---

## OBJECTIVES

• To implement the 0/1 Knapsack algorithm using Dynamic Programming approach.  
• To design and develop a full-stack web application with proper frontend-backend separation.  
• To create a RESTful API for resource optimization calculations.  
• To apply algorithm complexity analysis and performance optimization techniques.  
• To demonstrate real-world application of Design and Analysis of Algorithms (DAA) concepts.  
• To develop an intuitive user interface for disaster relief resource management.  
• To implement CRUD operations for dynamic resource handling.

---

## SYSTEM ANALYSIS

The proposed system addresses the challenge of optimal resource allocation in disaster relief scenarios. The system architecture follows a client-server model with clear separation of concerns:

**Backend System:**
- Implements the 0/1 Knapsack algorithm using Dynamic Programming
- Provides RESTful API endpoints for data retrieval and calculation
- Manages disaster types and their associated resources
- Validates input data and handles error conditions
- Returns optimized resource allocation with performance metrics

**Frontend System:**
- Provides interactive user interface for resource management
- Communicates with backend via asynchronous HTTP requests
- Displays real-time calculation results and algorithm performance
- Supports dynamic addition, modification, and deletion of resources
- Visualizes capacity utilization and value optimization

**Key Features:**
- Real-time optimization calculations
- Five pre-configured disaster scenarios
- Dynamic resource management
- Algorithm performance tracking (execution time, complexity)
- Responsive web design

---

## ALGORITHM DESIGN AND IMPLEMENTATION

### 0/1 Knapsack Problem

**Problem Statement:**  
Given a set of items, each with a weight and value, determine which items to include in a collection so that the total weight is less than or equal to a given capacity and the total value is maximized. Each item can either be included (1) or excluded (0) — hence "0/1" Knapsack.

**Dynamic Programming Approach:**

The algorithm uses a bottom-up dynamic programming approach with the following recurrence relation:

```
dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i])

where:
- dp[i][w] = maximum value achievable using first i items with capacity w
- If weight[i] > w: dp[i][w] = dp[i-1][w] (item cannot be included)
- Otherwise: choose max between including or excluding the item
```

**Algorithm Steps:**

1. **Initialization:** Create a 2D DP table of size (n+1) × (W+1)
2. **Base Case:** dp[0][w] = 0 for all w (no items = zero value)
3. **Fill DP Table:** Iterate through items and capacities, applying recurrence relation
4. **Backtracking:** Trace back through the table to identify selected items
5. **Result:** Return maximum value and list of selected items

**Time Complexity:** O(n × W)  
**Space Complexity:** O(n × W)  
where n = number of items, W = knapsack capacity

---

## ER DIAGRAM AND SYSTEM ARCHITECTURE

### System Architecture

```
┌─────────────────────────────────────────────────┐
│            FRONTEND (Client Side)               │
│  ┌──────────────────────────────────────────┐  │
│  │  HTML5 + CSS3 + Vanilla JavaScript       │  │
│  │  • Disaster Type Selector                │  │
│  │  • Resource Input Interface              │  │
│  │  • Results Visualization                 │  │
│  │  • Real-time API Communication           │  │
│  └──────────────────────────────────────────┘  │
│                   ↕ HTTP/JSON                   │
└─────────────────────────────────────────────────┘
                      ↕
┌─────────────────────────────────────────────────┐
│            BACKEND (Server Side)                │
│  ┌──────────────────────────────────────────┐  │
│  │      Node.js + Express.js REST API       │  │
│  │                                          │  │
│  │  Routes Layer (API Endpoints)            │  │
│  │         ↓                                │  │
│  │  Controllers (Business Logic)            │  │
│  │         ↓                                │  │
│  │  Algorithm Implementation (0/1 Knapsack) │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### Data Model

**Entity: Disaster**
| Attribute    | Type   | Description                          |
|--------------|--------|--------------------------------------|
| id           | String | Unique identifier (Primary Key)      |
| name         | String | Disaster type name                   |
| icon         | String | Visual representation                |
| description  | String | Disaster description                 |
| resources[]  | Array  | Associated resource items            |

**Entity: Resource**
| Attribute | Type   | Description                     |
|-----------|--------|---------------------------------|
| id        | Number | Unique identifier               |
| name      | String | Resource name                   |
| value     | Number | Resource value ($)              |
| weight    | Number | Resource weight (kg)            |

**Entity: AllocationResult**
| Attribute       | Type   | Description                        |
|-----------------|--------|------------------------------------|
| maxValue        | Number | Maximum achievable value           |
| totalWeight     | Number | Total weight of selected items     |
| capacityUsed    | Number | Percentage of capacity utilized    |
| selectedItems[] | Array  | List of items included in solution |

---

## IMPLEMENTATION

The system is implemented using modern web technologies with a modular architecture:

### Backend Implementation (Node.js/Express)

**Major Components:**

| Component              | File Path                         | Description                              |
|------------------------|-----------------------------------|------------------------------------------|
| Server                 | server.js                         | Express server configuration and routing |
| Knapsack Controller    | controllers/knapsackController.js | 0/1 Knapsack DP algorithm implementation |
| Disaster Controller    | controllers/disasterController.js | Disaster data management                 |
| Knapsack Routes        | routes/knapsack.js                | API endpoints for calculations           |
| Disaster Routes        | routes/disasters.js               | API endpoints for disaster data          |

**Key Functions:**

```javascript
function knapsack01(items, capacity)
- Implements 0/1 Knapsack using Dynamic Programming
- Returns: { maxValue, selectedItems, totalWeight, capacityUsed }

function calculate01Knapsack(req, res)
- API controller for handling calculation requests
- Validates input and processes algorithm execution
- Returns JSON response with results and metadata
```

### Frontend Implementation (HTML/CSS/JavaScript)

**Major Components:**

| Component        | File Path   | Description                           |
|------------------|-------------|---------------------------------------|
| User Interface   | index.html  | Main HTML structure and layout        |
| Styling          | styles.css  | Responsive CSS design                 |
| Application Logic| app.js      | Frontend logic and API integration    |

**Core Functions:**

```javascript
async loadDisasters()
- Fetches disaster types from backend API

async selectDisaster(type)
- Loads resources for selected disaster type

async calculate()
- Sends resources to backend for optimization
- Receives and displays results

renderResults(result, metadata)
- Visualizes optimization results
- Displays algorithm performance metrics
```

### API Endpoints

| Method | Endpoint                     | Description                          |
|--------|------------------------------|--------------------------------------|
| GET    | /api/disasters               | Retrieve all disaster types          |
| GET    | /api/disasters/:id           | Retrieve specific disaster data      |
| POST   | /api/knapsack/calculate      | Calculate optimal resource allocation|

**Sample API Request:**
```json
POST /api/knapsack/calculate
{
  "items": [
    {"name": "Water Tablets", "value": 500, "weight": 2},
    {"name": "Emergency Boats", "value": 1201, "weight": 50}
  ],
  "capacity": 100
}
```

**Sample API Response:**
```json
{
  "success": true,
  "result": {
    "maxValue": 1701,
    "totalWeight": 52,
    "capacityUsed": 52,
    "selectedItems": [...],
    "itemsCount": 2,
    "selectedCount": 2
  },
  "metadata": {
    "executionTime": "2ms",
    "algorithm": "0/1 Knapsack (Dynamic Programming)",
    "complexity": "O(n * W)"
  }
}
```

---

## RESULTS AND DISCUSSION

The project successfully demonstrates the implementation and application of the 0/1 Knapsack algorithm for disaster relief optimization. 

**Key Achievements:**

1. **Algorithm Efficiency:** The Dynamic Programming implementation provides optimal solutions in O(n×W) time complexity, significantly faster than brute-force approaches (O(2^n)).

2. **Real-time Performance:** Calculations are completed in milliseconds (typically < 5ms for datasets with 10-20 items), enabling real-time user interaction.

3. **Practical Application:** The system addresses real-world disaster scenarios with five distinct disaster types, each with contextually appropriate resources.

4. **User Experience:** The responsive web interface allows non-technical users to perform complex optimization calculations without understanding the underlying algorithm.

5. **Scalability:** The modular architecture supports easy addition of new disaster types, resources, and optimization algorithms.

**Testing Results:**

- ✅ Algorithm correctly maximizes value while respecting capacity constraints
- ✅ Backtracking accurately identifies selected items
- ✅ API handles concurrent requests efficiently
- ✅ Frontend updates display real-time without page refresh
- ✅ Input validation prevents invalid calculations
- ✅ Error handling provides meaningful feedback to users

**Comparative Analysis:**

| Approach           | Time Complexity | Space Complexity | Optimal? |
|--------------------|-----------------|------------------|----------|
| Brute Force        | O(2^n)          | O(n)             | Yes      |
| Dynamic Programming| O(n × W)        | O(n × W)         | Yes      |
| Greedy Algorithm   | O(n log n)      | O(1)             | No       |

The DP approach provides the best balance of time efficiency and optimality for this problem.

---

## INSTALLATION AND SETUP INSTRUCTIONS

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Python 3.x (for frontend server)
- Modern web browser (Chrome, Firefox, Edge, Safari)

### Installation Steps

**Step 1: Navigate to Project Directory**
```bash
cd disaster-relief-app
```

**Step 2: Install Backend Dependencies**
```bash
cd backend
npm install
```

This installs:
- express (^4.18.2) - Web framework
- cors (^2.8.5) - Cross-Origin Resource Sharing
- body-parser (^1.20.2) - Request body parsing

**Step 3: Start Backend Server**
```bash
npm start
```
Backend will run on: http://localhost:3000

**Step 4: Start Frontend Server**

Open a new terminal window:
```bash
cd frontend
python3 -m http.server 8080
```

Frontend will run on: http://localhost:8080

**Step 5: Access Application**

Open your web browser and navigate to:
```
http://localhost:8080
```

### Quick Start Script

For convenience, use the provided startup scripts:

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

**Windows:**
```cmd
start.bat
```

---

## USAGE INSTRUCTIONS

### 1. Select Disaster Type
Click on any disaster type from the left sidebar:
- Flood �
- Earthquake 🏚️
- Wildfire 🔥
- Hurricane 🌪️
- Landslide ⛰️

Each disaster type loads pre-configured resources appropriate for that scenario.

### 2. Set Capacity
Adjust the maximum capacity (in kg) using the input field. Default is 100 kg.

### 3. Manage Resources
- **Edit:** Click on any field to modify resource name, value, or weight
- **Delete:** Click the 🗑️ icon to remove a resource
- **Add:** Click "Add Resource" button to create a new resource entry

### 4. View Results
The right panel automatically displays:
- **Total Value:** Maximum value achieved ($)
- **Total Weight:** Total weight of selected resources (kg)
- **Capacity Used:** Percentage of capacity utilized
- **Selected Items:** Resources included in optimal solution (highlighted)
- **Algorithm Metrics:** Execution time and complexity analysis

---

## CONCLUSION AND FUTURE WORK

### Conclusion

This project successfully demonstrates the practical application of the 0/1 Knapsack algorithm using Dynamic Programming for disaster relief resource optimization. The full-stack implementation showcases how theoretical computer science concepts can be transformed into functional, user-friendly applications that address real-world challenges.

**Key Learnings:**
- Implementation of classic optimization algorithms in production environments
- Design and development of RESTful API architecture
- Integration of frontend and backend systems
- Application of algorithm complexity analysis
- Practical problem-solving in emergency management contexts

The system effectively balances algorithmic efficiency with usability, providing optimal solutions in real-time while maintaining an intuitive interface for end users.

### Future Enhancements

**Algorithm Improvements:**
1. **Fractional Knapsack Variant:** Implement greedy approach for scenarios where resources can be partially allocated
2. **Multi-dimensional Knapsack:** Consider additional constraints (volume, priority level, expiration dates)
3. **Bounded Knapsack:** Allow multiple quantities of the same resource type
4. **Branch and Bound:** Optimize for larger datasets with pruning techniques

**System Features:**
1. **Database Integration:** 
   - MySQL/PostgreSQL for persistent data storage
   - Historical transaction tracking
   - User authentication and authorization

2. **Advanced Analytics:**
   - Resource allocation history and trends
   - Predictive modeling for disaster scenarios
   - Cost-benefit analysis reports
   - Export functionality (PDF, Excel, CSV)

3. **User Interface Enhancements:**
   - Data visualization charts (pie charts, bar graphs)
   - Drag-and-drop resource management
   - Mobile-responsive design improvements
   - Dark mode theme

4. **Real-time Collaboration:**
   - Multi-user support with WebSocket integration
   - Real-time resource availability updates
   - Coordination between multiple relief centers

5. **Integration Capabilities:**
   - RFID tracking for physical resources
   - GPS integration for location-based optimization
   - Weather API for disaster prediction
   - Cloud deployment (AWS, Azure, GCP)

6. **Machine Learning:**
   - Resource demand prediction using historical data
   - Automated disaster type classification
   - Optimization parameter tuning

7. **Security Enhancements:**
   - JWT-based authentication
   - Role-based access control
   - API rate limiting
   - Data encryption

---

## REFERENCES

### Books and Publications

1. **Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022).** *Introduction to Algorithms* (4th ed.). MIT Press.
   - Chapter 15: Dynamic Programming

2. **Kleinberg, J., & Tardos, É. (2021).** *Algorithm Design*. Pearson Education.
   - Chapter 6: Dynamic Programming

3. **Dasgupta, S., Papadimitriou, C. H., & Vazirani, U. V. (2008).** *Algorithms*. McGraw-Hill Education.
   - Chapter 6: Dynamic Programming

### Technical Documentation

4. **Node.js Documentation:** https://nodejs.org/en/docs/

5. **Express.js Guide:** https://expressjs.com/en/guide/routing.html

6. **MDN Web Docs - JavaScript:** https://developer.mozilla.org/en-US/docs/Web/JavaScript

7. **REST API Design Best Practices:** https://restfulapi.net/

### Algorithm Resources

8. **GeeksforGeeks (2024).** *0-1 Knapsack Problem | DP-10*  
   https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/

9. **LeetCode Problems:** *Knapsack Problem Variations*  
   https://leetcode.com/tag/dynamic-programming/

10. **Programiz (2024).** *Dynamic Programming - 0/1 Knapsack Problem*  
    https://www.programiz.com/dsa/knapsack-problem

### Research Papers

11. **Martello, S., & Toth, P. (1990).** *Knapsack Problems: Algorithms and Computer Implementations*. John Wiley & Sons.

12. **Kellerer, H., Pferschy, U., & Pisinger, D. (2004).** *Knapsack Problems*. Springer.

### Web Development Resources

13. **W3Schools:** *HTML, CSS, JavaScript Tutorials*  
    https://www.w3schools.com/

14. **freeCodeCamp:** *Full Stack Web Development*  
    https://www.freecodecamp.org/

15. **Mozilla Developer Network (MDN):** *HTTP and APIs*  
    https://developer.mozilla.org/en-US/docs/Web/HTTP

---

## APPENDIX

### A. System Requirements

**Minimum Requirements:**
- CPU: Dual-core processor (2.0 GHz or higher)
- RAM: 4 GB
- Storage: 500 MB free space
- Browser: Chrome 90+, Firefox 88+, Edge 90+, Safari 14+

**Recommended Requirements:**
- CPU: Quad-core processor (3.0 GHz or higher)
- RAM: 8 GB or more
- Storage: 1 GB free space
- Internet: Broadband connection for API communication

### B. Project Statistics

- **Total Lines of Code:** ~800 lines
- **Backend (JavaScript):** ~400 lines
- **Frontend (HTML/CSS/JS):** ~400 lines
- **Documentation:** ~2000 lines
- **Development Time:** 40-50 hours
- **Testing Coverage:** API endpoints, algorithm correctness, UI functionality

### C. Troubleshooting

**Issue: Backend server won't start**
- Solution: Check if port 3000 is already in use
- Command: `lsof -i :3000` (Linux/Mac) or `netstat -ano | findstr :3000` (Windows)

**Issue: Frontend can't connect to backend**
- Solution: Ensure backend is running and CORS is enabled
- Check: http://localhost:3000/api/health

**Issue: npm install fails**
- Solution: Clear npm cache: `npm cache clean --force`
- Try: `npm install --legacy-peer-deps`

### D. Contact Information

For queries and support:
- Project Repository: [GitHub Link]
- Email: [student@example.com]
- Department: Computer Science and Engineering
- Institution: Manav Rachna International Institute of Research and Studies

---

## ACKNOWLEDGMENTS

We would like to express our sincere gratitude to:

- **Dr. XYZ**, our project guide, for valuable guidance and continuous support
- **Department of Computer Science and Engineering**, MRIIRS, for providing necessary resources
- **Faculty members** who provided constructive feedback during project reviews
- **Open-source community** for excellent documentation and learning resources

---

**End of Document**

*Last Updated: November 16, 2025*  
*Version: 1.0*  
*Academic Year: 2025-2026*

---
