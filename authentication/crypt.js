import bcrypt from "bcrypt";

export let HashPassword = async (plainPassword) => {
  try {
    let Hashed = await bcrypt.hash(plainPassword, 10);
    return Hashed;
  } catch (error) {
    console.log("error occured while hashing password" + error.message);
  }
};

export let comparePasswords = async (plainPassword, DBPassword) => {
  try {
    let ComparedPassword = await bcrypt.compare(plainPassword, DBPassword);
    if(ComparedPassword){
      console.log('password matched in crypt');
      return ComparedPassword;
      
    }else{
      console.log('not match');
    }
  } catch (error) {
    console.log("error occured while comparing password" + error.message);
  }
};
