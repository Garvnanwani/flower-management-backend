export const handlelogin=(req,res,db,bcrypt)=>{

    const {email,password}=req.body;
    
    if(!email || !password){
        return res.status(400).json("email or password not inserted")
    }
    const sql=`SELECT * FROM users where email='${email}'`;
    
    db.query(sql,  (err, users) =>{
      if (err) { throw err;}
        if(users.length>0){
          const isvalid=bcrypt.compareSync(password,users[0].password);
            if(isvalid){
            res.json(users[0])
            }
            else {   res.status(400).json("wrong credential") }
        }
        else {
            res.json("no such user exist"); 
             }
        
    });
    
    // res.json("no such user exist"); return;
  
