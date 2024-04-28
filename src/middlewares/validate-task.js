export const validateIdEmpty = (req, res, next) =>{

    const {id} = req.params;

    if(!id || id === ""){

        res.status(200).json({
            msg: `Error, No ID in params.`
        });
        
    }
    
    next();

} 