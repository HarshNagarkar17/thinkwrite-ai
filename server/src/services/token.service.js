import jwt from "jsonwebtoken";
import moment from "moment";
import { config } from "../config/config.js";

const tokenService = {}

tokenService.createToken = function(id,exp){
    const payload = {
        sub:id,
        exp:exp.unix(),
        iat:moment().unix()
    }
    return jwt.sign(payload,config.jwt.secret);
}

tokenService.generateTokens = async function(id){
    const accessTokenExp = moment().add(25,"minutes");
    const accessToken = await this.createToken(id,accessTokenExp);

    return accessToken;
}

export default tokenService;