const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const os = require('os');
const networkInterfaces = os.networkInterfaces();

const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logFile = path.join(logDir, 'system.log');

function getServerIP() {
    for (const iface of Object.values(networkInterfaces)) {
        for (const alias of iface) {
            if (alias.family === 'IPv4' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return 'unknown';
}

function getTimestamp() {
    const now = new Date();
    return now.toISOString().replace('T', ' ').replace('Z', '');
}

function generateTransactionId() {
    return `TR-${uuidv4()}`;
}

function generateTraceId() {
    return `TC-${uuidv4()}`;
}

function maskSensitive(obj) {
    if (!obj || typeof obj !== 'object') return obj;
    const SENSITIVE_KEYS = ['password', 'pass', 'pwd', 'secret', 'token', 'accessToken', 'refreshToken'];
    const masked = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        if (SENSITIVE_KEYS.includes(key.toLowerCase())) {
            masked[key] = '***MASKED***';
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            masked[key] = maskSensitive(obj[key]);
        } else {
            masked[key] = obj[key];
        }
    }
    return masked;
}

/**
 * Standard log function for system logging.
 * @param {Object} options - Log options.
 * @param {string} options.level - Log level (INFO, WARN, DEBUG, ERROR, FATAL).
 * @param {string} options.serviceName - Name of the service/API.
 * @param {string} options.endpoint - Endpoint URL.
 * @param {string} options.protocol - Protocol (rest/soap/rpc).
 * @param {string} options.methodType - HTTP method (POST, GET, etc).
 * @param {string} options.executionType - sync or async.
 * @param {string} options.contentType - Content-Type header value.
 * @param {string} options.functionName - Name of the function executed.
 * @param {Object} options.callerInfo - User info (UserID, Role, etc).
 * @param {number} options.executionTime - Execution time in ms.
 * @param {string} options.clientIP - Client IP address.
 * @param {string} options.eventName - Event name.
 * @param {string} options.prevTransactionId - Previous transaction ID.
 * @param {Object} options.bodyParams - Request body params.
 * @param {Object} options.result - Result of the function.
 * @param {Object} options.error - Error object if any.
 * @param {string} options.flag - 'START' or 'STOP'.
 * @param {string} options.message - Message to log.
 * @param {string} [options.transactionId] - Transaction ID (auto-generated if not provided).
 * @param {string} [options.traceId] - Trace ID (auto-generated if not provided).
 */
function log({
    level = 'INFO',
    serviceName = '',
    endpoint = '',
    protocol = '',
    methodType = '',
    executionType = '',
    contentType = '',
    functionName = '',
    callerInfo = {},
    executionTime = '0',
    eventName = '',
    prevTransactionId = '',
    bodyParams = {},
    result = {},
    error = '',
    flag = '',
    message = '',
    transactionId = '',
    traceId = '',
    clientIP = '',
} = {}) {
    const logTimestamp = getTimestamp();
    // Use traceId from context (req.traceId if available)
    let trId = traceId;
    if (!trId && typeof global !== 'undefined' && global._currentTraceId) {
        trId = global._currentTraceId;
    }
    if (!trId) {
        trId = generateTraceId();
    }
    const trxId = generateTransactionId();
    const serverIP = getServerIP();
    // Ensure executionTime is always shown as milliseconds with 'ms' suffix
    if (typeof executionTime === 'number' || (typeof executionTime === 'string' && executionTime !== 'ms')) {
        executionTime = `${executionTime}ms`;
    } else {
        executionTime = '0ms';
    }
    const maskedBodyParams = maskSensitive(bodyParams);
    const maskedResult = maskSensitive(result);
    const caller = `UserID: ${callerInfo.userId || ''}, Role: ${callerInfo.role || ''}`;
    const logLine = [
        logTimestamp,
        level,
        trxId,
        serviceName,
        endpoint,
        protocol,
        methodType,
        executionType,
        contentType,
        functionName,
        caller,
        executionTime,
        serverIP,
        clientIP,
        eventName,
        trId,
        prevTransactionId,
        JSON.stringify(maskedBodyParams),
        JSON.stringify(maskedResult),
        error ? JSON.stringify(error) : '',
        flag,
        message
    ].join('\t');
    console.log(logLine);
    return { transactionId: trxId, traceId: trId };
}

module.exports = log;
