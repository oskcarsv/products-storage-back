export const validateIdEmpty = (req, next) =>{

    const {id} = req.params;

    if(id == "" || id.isEmpty() || id == null){

        res.status(200).json({
            msg: `Error, No ID in params.`
        });
        
    }
    
    next();

} 