const register = async(req,res) => {
    try {
        const{fullname, email, password} = req.body;
        if(fullname || email || password){
            return res.status(400).json({
                message:"All fields are required",
                success:false
            })
        }       
    } catch (error) {
        console.log(error);
        
    }
}