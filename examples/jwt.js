const app = require("express")();
const jwt = require('jsonwebtoken');

const PORT = 3000;  
const JWT_SECRET_KEY = "my-secret";
const TOKEN_HEADER_KEY = "token";

app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT} ...`);
});
  
// Generation of JWT
app.get("/generateToken", (req, res) => {
    let jwtSecretKey = JWT_SECRET_KEY;
    let data = {
        time: Date(),
        username : "John Doe",
        userId: 12,
    }
  
    const token = jwt.sign(data, jwtSecretKey, { expiresIn : '10s' });
  
    res.send(token);
});
  
// Verification of JWT
app.get("/validateToken", (req, res) => {
    try {

        const token = req.headers[TOKEN_HEADER_KEY];      
        if (token == "") return res.sendStatus(401);

        jwt.verify(token, JWT_SECRET_KEY, (error, verified) => {
            if (error)
                return res.status(401).send(error);
            else {
                return res.send(`Successfully Verified :  ${verified.username}`)
            }
        });

    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});