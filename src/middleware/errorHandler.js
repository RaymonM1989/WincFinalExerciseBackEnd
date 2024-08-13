const errorHandler = (err, req, res, next) =>
{
    console.error(err);
    return res.status(500).json({ message: 'An error occurred on the server!' });
};

export default errorHandler;