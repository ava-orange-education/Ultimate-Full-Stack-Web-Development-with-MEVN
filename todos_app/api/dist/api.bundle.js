/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const http = __importStar(__webpack_require__(1));
const app_1 = __importDefault(__webpack_require__(2));
if (false) {}
const db_config_1 = __importDefault(__webpack_require__(24));
const mongoose_1 = __importDefault(__webpack_require__(10));
const api_logger_1 = __webpack_require__(11);
console.log('process.env.NODE_ENV  ', "production");
const port = "3080" || 0;
const server = http.createServer(app_1.default);
server.listen(port);
const logger = new api_logger_1.LoggerService();
server.on("listening", async () => {
    const addr = server.address();
    const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr === null || addr === void 0 ? void 0 : addr.port}`;
    db_config_1.default.connectToDB();
    logger.info(`Express Server Listening on ${bind}`);
    mongoose_1.default.connection.on('connected', () => logger.info(`Connected to MongoDB, Connection Name ${mongoose_1.default.Connection.name}`));
    mongoose_1.default.connection.on('disconnected', () => logger.info(`Disconnected, Connection Name ${mongoose_1.default.Connection.name}`));
});
module.exports = app_1.default;


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("http");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const bodyParser = __importStar(__webpack_require__(3));
const express_1 = __importDefault(__webpack_require__(4));
const user_1 = __importDefault(__webpack_require__(5));
const todos_1 = __importDefault(__webpack_require__(16));
const api_logger_1 = __webpack_require__(11);
const path_1 = __importDefault(__webpack_require__(22));
const express_rate_limit_1 = __importDefault(__webpack_require__(15));
const globalErrorHandler_1 = __webpack_require__(23);
class App {
    constructor() {
        this.express = (0, express_1.default)();
        this.routes();
        this.middleware();
        this.logger = new api_logger_1.LoggerService();
    }
    middleware() {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(express_1.default.static(path_1.default.join(__dirname, '../../ui', 'dist')));
        const limiter = (0, express_rate_limit_1.default)({
            windowMs: 15 * 60 * 1000,
            max: 100,
            standardHeaders: true,
            legacyHeaders: false,
        });
        this.express.use(limiter);
        this.express.use(globalErrorHandler_1.globalErrorHandler);
    }
    routes() {
        this.express.get("/error", (req, res, next) => {
            throw new Error('Tetsing Global Error Hnadler.');
        });
        this.express.get('/assets/:file', (req, res) => {
            const filePath = path_1.default.join(__dirname, '../../ui/dist/assets', req.params.file);
            res.sendFile(filePath);
        });
        this.express.use('/api/user', user_1.default);
        this.express.use('/api/todos', todos_1.default);
        this.express.use("/", (req, res, next) => {
            this.logger.debug(`Handling unhandled route ${req.path}`);
            res.sendFile(path_1.default.join(__dirname, '../../ui', 'dist', 'index.html'));
        });
    }
}
exports["default"] = new App().express;


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __importDefault(__webpack_require__(4));
const user_controller_1 = __webpack_require__(6);
const user_validation_1 = __webpack_require__(13);
const api_logger_1 = __webpack_require__(11);
const express_rate_limit_1 = __importDefault(__webpack_require__(15));
class User {
    constructor() {
        this.express = (0, express_1.default)();
        this.routes();
        this.userController = new user_controller_1.UserController();
        this.logger = new api_logger_1.LoggerService();
    }
    routes() {
        const loginLimiter = (0, express_rate_limit_1.default)({
            windowMs: 60 * 60 * 1000,
            max: 2,
            message: 'Too many login attempts from this IP, please try again after an hour',
        });
        this.express.post("/signin", loginLimiter, async (req, res, next) => {
            const { error, value } = user_validation_1.signinSchema.validate(req.body);
            if (error) {
                res.status(400).json({ message: error.details[0].message, statusCode: 400, result: value });
                return;
            }
            const result = await this.userController.signin(req.body);
            res.status(200).json(result);
        });
        this.express.post("/signup", async (req, res, next) => {
            const { error, value } = user_validation_1.signupSchema.validate(req.body);
            if (error) {
                res.status(400).json({ message: error.details[0].message, statusCode: 400, result: value });
                return;
            }
            const result = await this.userController.singup(req.body);
            res.status(200).json(result);
        });
    }
}
exports["default"] = new User().express;


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const user_service_1 = __webpack_require__(7);
class UserController {
    constructor() {
        this.userService = new user_service_1.UserService();
    }
    signin(user) {
        console.info('Controller: signin', user);
        return this.userService.signin(user);
    }
    singup(user) {
        console.info('Controller: signup', user);
        return this.userService.signup(user);
    }
}
exports.UserController = UserController;


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const user_repository_1 = __webpack_require__(8);
const user_model_1 = __webpack_require__(9);
const api_logger_1 = __webpack_require__(11);
class UserService {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository(user_model_1.UserModel);
        this.logger = new api_logger_1.LoggerService();
    }
    async signin(user) {
        this.logger.info('Service: signin');
        const result = await this.userRepository.getByEmailAndPassword(user.email, user.password);
        const response = {
            statusCode: 200,
            result
        };
        return response;
    }
    async signup(user) {
        this.logger.info(`Service: Signup, ${user}`);
        const result = await this.userRepository.create(user);
        const response = {
            statusCode: 200,
            result
        };
        return response;
    }
}
exports.UserService = UserService;


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRepository = void 0;
class UserRepository {
    constructor(model) {
        this.model = model;
    }
    getByEmailAndPassword(email, password) {
        return this.model.findOne({ email, password }).exec();
    }
    create(item) {
        return this.model.create(item);
    }
}
exports.UserRepository = UserRepository;


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModel = exports.userSchema = void 0;
const mongoose_1 = __webpack_require__(10);
exports.userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });
exports.UserModel = (0, mongoose_1.model)("users", exports.userSchema);


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerService = void 0;
const winston_1 = __importDefault(__webpack_require__(12));
class LoggerService {
    constructor() {
        this.logger = winston_1.default.createLogger({
            level: 'info',
            format: winston_1.default.format.combine(winston_1.default.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }), winston_1.default.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)),
            transports: []
        });
    }
    info(message) {
        this.logger.info(message);
    }
    warn(message) {
        this.logger.warn(message);
    }
    error(message) {
        this.logger.error(message);
    }
    debug(message) {
        this.logger.debug(message);
    }
}
exports.LoggerService = LoggerService;


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("winston");

/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.signupSchema = exports.signinSchema = void 0;
const joi_1 = __importDefault(__webpack_require__(14));
exports.signinSchema = joi_1.default.object({
    password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: joi_1.default.string().email({
        tlds: { allow: true }
    }).required()
});
exports.signupSchema = joi_1.default.object({
    firstName: joi_1.default.string().alphanum().min(2).max(30).required(),
    lastName: joi_1.default.string().alphanum().min(2).max(30).required(),
    password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: joi_1.default.string().email({
        tlds: { allow: true }
    }).required()
});


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("joi");

/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("express-rate-limit");

/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __importDefault(__webpack_require__(4));
const todos_controller_1 = __webpack_require__(17);
const todos_validation_1 = __webpack_require__(21);
const api_logger_1 = __webpack_require__(11);
class Todos {
    constructor() {
        this.express = (0, express_1.default)();
        this.routes();
        this.todosController = new todos_controller_1.TodosController();
        this.logger = new api_logger_1.LoggerService();
    }
    routes() {
        this.express.get("/tasks", async (req, res, next) => {
            this.logger.info("url:::::::" + req.url);
            const result = await this.todosController.getTasks();
            res.status(200).json(result);
        });
        this.express.put("/task", async (req, res, next) => {
            const { error, value } = todos_validation_1.updateTaskSchema.validate(req.body);
            if (error) {
                res.status(400).json({ message: error.details[0].message, statusCode: 400, result: value });
                return;
            }
            const result = await this.todosController.updateTask(req.body);
            res.status(200).json(result);
        });
        this.express.post("/task", async (req, res, next) => {
            const { error, value } = todos_validation_1.createTaskSchema.validate(req.body);
            if (error) {
                res.status(400).json({ message: error.details[0].message, statusCode: 400, result: value });
                return;
            }
            const result = await this.todosController.createTask(req.body);
            res.status(200).json(result);
        });
        this.express.delete("/task/:id", async (req, res, next) => {
            this.logger.info("url:::::::" + req.url);
            const result = await this.todosController.deleteTask(req.params.id);
            res.status(200).json(result);
        });
        this.express.get("/task/:id", async (req, res, next) => {
            this.logger.info("url:::::::" + req.url);
            const result = await this.todosController.getTaskDetails(req.params.id);
            res.status(200).json(result);
        });
    }
}
exports["default"] = new Todos().express;


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TodosController = void 0;
const todos_service_1 = __webpack_require__(18);
class TodosController {
    constructor() {
        this.todosService = new todos_service_1.TodosService();
    }
    getTasks() {
        console.info('Controller: getTasks', null);
        return this.todosService.getTasks();
    }
    createTask(task) {
        console.info('Controller: createTask', task);
        return this.todosService.createTask(task);
    }
    updateTask(task) {
        console.info('Controller: updateTask', task);
        return this.todosService.updateTask(task);
    }
    deleteTask(taskId) {
        console.info('Controller: deleteTask', taskId);
        return this.todosService.deleteTask(taskId);
    }
    getTaskDetails(taskId) {
        console.info('Controller: getTask Details', null);
        return this.todosService.getTaskDetails(taskId);
    }
}
exports.TodosController = TodosController;


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TodosService = void 0;
const tasks_repository_1 = __webpack_require__(19);
const tasks_model_1 = __webpack_require__(20);
const api_logger_1 = __webpack_require__(11);
class TodosService {
    constructor() {
        this.taskRepository = new tasks_repository_1.TasksRepository(tasks_model_1.TasksModel);
        this.logger = new api_logger_1.LoggerService();
    }
    async getTasks() {
        this.logger.info(`Service: getTasks`);
        const result = await this.taskRepository.getAll();
        const response = {
            statusCode: 200,
            result
        };
        return response;
    }
    async createTask(task) {
        this.logger.info(`Service: createTask, ${task}`);
        const result = await this.taskRepository.create(task);
        const response = {
            statusCode: 200,
            result
        };
        return response;
    }
    async updateTask(task) {
        this.logger.info(`Service: updateTask, ${task}`);
        const result = await this.taskRepository.update(task._id, task);
        const response = {
            statusCode: 200,
            result
        };
        return response;
    }
    async deleteTask(taskId) {
        this.logger.info(`Service: deleteTask, ${taskId}`);
        const result = await this.taskRepository.delete(taskId);
        const response = {
            statusCode: 200,
            result
        };
        return response;
    }
    async getTaskDetails(taskId) {
        console.info(`Service: getTasks, ${taskId}`);
        const taskDetails = await this.taskRepository.getById(taskId);
        const response = {
            statusCode: 200,
            result: taskDetails
        };
        return response;
    }
}
exports.TodosService = TodosService;


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TasksRepository = void 0;
class TasksRepository {
    constructor(model) {
        this.model = model;
    }
    create(item) {
        return this.model.create(item);
    }
    getAll() {
        return this.model.find({}).exec();
    }
    getById(id) {
        return this.model.findOne({ _id: id });
    }
    update(id, item) {
        return this.model.findOneAndUpdate({ _id: id }, { ...item });
    }
    delete(id) {
        return this.model.deleteOne({ _id: id });
    }
}
exports.TasksRepository = TasksRepository;


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TasksModel = exports.tasksSchema = void 0;
const mongoose_1 = __webpack_require__(10);
exports.tasksSchema = new mongoose_1.Schema({
    task: { type: String, required: true },
    description: { type: String, required: true },
    assignee: { type: String, required: true, unique: true },
    status: { type: String, required: true },
    createdBy: { type: String, required: false },
    updatedBy: { type: String, required: false }
}, { timestamps: true });
exports.TasksModel = (0, mongoose_1.model)("tasks", exports.tasksSchema);


/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createTaskSchema = exports.updateTaskSchema = void 0;
const joi_1 = __importDefault(__webpack_require__(14));
exports.updateTaskSchema = joi_1.default.object({
    _id: joi_1.default.string(),
    task: joi_1.default.string().alphanum().min(2).max(30).required(),
    assignee: joi_1.default.string().alphanum().min(2).max(30).required(),
    description: joi_1.default.string().min(2).required(),
    status: joi_1.default.string().alphanum().min(2).required(),
    createdBy: joi_1.default.string().alphanum().min(2),
    updatedBy: joi_1.default.string().alphanum().min(2),
});
exports.createTaskSchema = joi_1.default.object({
    _id: joi_1.default.string(),
    task: joi_1.default.string().alphanum().min(2).max(30).required(),
    assignee: joi_1.default.string().alphanum().min(2).max(30).required(),
    description: joi_1.default.string().min(2).required(),
    status: joi_1.default.string().alphanum().min(2).required(),
    createdBy: joi_1.default.string().alphanum().min(2),
    updatedBy: joi_1.default.string().alphanum().min(2)
});


/***/ }),
/* 22 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.globalErrorHandler = void 0;
function globalErrorHandler(err, req, res, next) {
    console.error(`Global Error Handler: ${err.message}`);
    if (!res.headersSent) {
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
}
exports.globalErrorHandler = globalErrorHandler;


/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MONGO_OPTIONS = void 0;
const mongoose_1 = __importDefault(__webpack_require__(10));
exports.MONGO_OPTIONS = {
    minPoolSize: 5,
    maxPoolSize: 100,
    socketTimeoutMS: 45000,
};
class DBConfiguration {
    constructor() {
        this.connectionURL = "mongodb+srv://bhargavbook58:tester12345@todos.usujbgr.mongodb.net/todos?retryWrites=true&w=majority" || 0;
    }
    async connectToDB() {
        if (!this.connection) {
            try {
                await mongoose_1.default.connect(this.connectionURL, exports.MONGO_OPTIONS);
                this.connection = mongoose_1.default.connection;
            }
            catch (error) {
                console.error(`Failed to connect to database at ${this.connectionURL}:`, error);
            }
        }
        return this.connection;
    }
    async closeConnection() {
        if (this.connection) {
            try {
                await this.connection.close();
                this.connection = null;
            }
            catch (error) {
                console.error(`Failed to close database connection at ${this.connectionURL}:`, error);
                throw error;
            }
        }
    }
}
exports["default"] = new DBConfiguration();


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;