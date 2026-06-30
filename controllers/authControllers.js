const User=require('../Models/User')

exports.login=async(req,res) => {
    try {
        const {email, password} = req.body;
        
        if (!email || !password){
            return res.status(400).json({message:'Please provide email and password'    });

        }

        const user =await User.findOne({ email }).select('+password');
        if(!user || !(await user.correctPassword(password,user.password))){
            return res.status(401).json({message:'Incorrect email or password'});
        }

        req.session.userId= user._id;
        res.status(200).json({message: 'Login successful'});

    }catch(error){
        res.status(500).json({message:'Server error',error:error.message})
    }


}