const log = require('../util/log');

function logMiddleware(req, res, next) {
    const start = Date.now();
    const callerInfo = { userId: req.body.userId || req.params.userId, role: req.user?.role };
    const logContext = {
        serviceName: 'IntegrationService',
        endpoint: req.originalUrl,
        protocol: 'rest',
        methodType: req.method,
        executionType: 'async',
        contentType: req.headers['content-type'],
        functionName: '', // can be set in controller if needed
        callerInfo,
        clientIP: req.ip,
        eventName: '', // can be set in controller if needed
        bodyParams: req.body,
        flag: 'START',
        message: 'Start request'
    };
    const { transactionId, traceId } = log({ ...logContext, level: 'INFO' });
    req.transactionId = transactionId;
    req.traceId = traceId;
    // Set global traceId for this request
    global._currentTraceId = traceId;

    res.on('finish', () => {
        log({
            ...logContext,
            transactionId,
            traceId,
            flag: 'STOP',
            executionTime: Date.now() - start,
            result: res.locals.result,
            message: 'Request finished',
            functionName: req.route?.stack[0]?.name || '',
            eventName: req.route?.path || ''
        });
        // Clean up global traceId after request
        delete global._currentTraceId;
    });

    next();
}

module.exports = logMiddleware;
