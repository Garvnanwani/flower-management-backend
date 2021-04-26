export const handlereg=(req,res,db,bcrypt)=>{
    const {user_id,name,email,password,default_shipping_address,phone_number}=req.body;
  // const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password ,10);
  if(!user_id || !name || !email || !password || !default_shipping_address || !phone_number){
    return res.status(400).json("Details need to be filled necessary ");
  }

  const user_sql = `
  INSERT INTO user 
  (
    user_id, 
    name, 
    email,
    password,
    default_shipping_address,
    phone_number
    )
  
  VALUES ( 
    '${user_id}',
    '${name}',
    '${email}',
    '${password}',
    '${default_shipping_address}',
    '${phone_number}',
  );
  `
 

db.query(user_sql, (err, result)=> {
 if(err){   res.json(" user already available"); return ;}

  console.log(result); 
  res.json(email)
 
 
});


}