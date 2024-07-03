import "./signupform24.css";
const SignUpNew24 = ({formData, setFormData, submitAct, formErrors}) => {

    const handleInput = (e, field) => {
        e.persist()
        setFormData((oldData) => {
            let newData = {...oldData}
            newData[field] = e.target.value
            return newData
        })
    }

  return (
    <>
      <div className="empty"></div>
      <div className="bg1">
      <img className="bgimg"
              src="https://i.postimg.cc/s2YjTFm5/wholebackground.png"
            ></img>
        <div className="robot1">
          {/* <img
            src="https://i.postimg.cc/tJx6NF5f/robot-cropped-1.png"
            className="robot-img"
          ></img>
          <img
            src="https://i.postimg.cc/v8VVf53y/bottom-cropped-final.png"
            className="bottom-img"
          ></img> */}
        </div>
        <div className="form1">
          <div className="heading head">SIGN UP</div>
          <form className="signup">

            <div className={"info-box " + ((formErrors.username != null) ? "error" : "")}>
              {/* <div className="info">Name :</div> */}
              <input
                id="name"
                type="text"
                placeholder="Name"
                required
                value={formData.username}
                onChange={(e) => { handleInput(e, "username") }}/>
            </div>

            <div className={"info-box " + ((formErrors.email != null) ? "error" : "")}>
              {/* <div className="info">Email-id :</div> */}
              <input
                id="email"
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => { handleInput(e, "email") }}/>
            </div>
           <div className="flexbox">
            <div className={"info-box " + ((formErrors.phone != null) ? "error" : "")}>
              {/* <div className="info">Contact Number :</div> */}
              <input
                id="contact"
                type="number"
                placeholder="Contact Number"
                required
                value={formData.phone}
                onChange={(e) => { handleInput(e, "phone") }}/>
            </div>

            <div className={"info-box " + ((formErrors.gender != null) ? "error" : "")}>
              {/* <div className="info">Gender :</div> */}
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={(e) => { handleInput(e, "gender") }}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            </div>
            <div className={"info-box " + ((formErrors.college != null) ? "error" : "")}>
              {/* <div className="info">College:</div> */}
              <input
                id="clg"
                type="text"
                placeholder="College"
                required
                value={formData.college}
                onChange={(e) => { handleInput(e, "college") }}/>
            </div>

            <div className={"info-box " + ((formErrors.collegeid != null) ? "error" : "")}>
              {/* <div className="info">College Id :</div> */}
              <input
                id="clg-id"
                type="text"
                placeholder="College Id"
                required
                value={formData.collegeid}
                onChange={(e) => { handleInput(e, "collegeid") }}/>
            </div>

            <div className={"info-box " + ((formErrors.department != null) ? "error" : "")}>
              {/* <div className="info">Department:</div> */}
              <input
              id="department"
              type="text"
              placeholder="Department"
              required
              value={formData.department}
              onChange={(e) => { handleInput(e, "department") }}/>
            </div>

            <div className={"info-box " + ((formErrors.city != null) ? "error" : "")}>
              {/* <div className="info">City :</div> */}
              <input
                id="city"
                type="text"
                placeholder="City"
                required
                value={formData.city}
                onChange={(e) => { handleInput(e, "city") }}/>
            </div>

            <div className={"info-box " + ((formErrors.state != null) ? "error" : "")}>
              {/* <div className="info">State :</div> */}
              <input 
                id="state"
                type="text"
                placeholder="State"
                required
                value={formData.state}
                onChange={(e) => { handleInput(e, "state") }}/>
            </div>

            <div className="flexbox">
              <div className={"info-box " + ((formErrors.password != null) ? "error" : "")}>
              {/* <div className="info">Password:</div> */}
              <input
                id="password"
                type="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={(e) => { handleInput(e, "password") }}/>
              </div>

              <div className={"info-box " + ((formErrors.conpassword != null) ? "error" : "")}>
              {/* <div className="info">Confirm Password:</div> */}
              <input
                id="department"
                type="password"
                placeholder="ConfirmPassword"
                required
                value={formData.conpassword}
                onChange={(e) => { handleInput(e, "conpassword") }}/>
              </div>
            </div>
            
          </form>

          <div className="errorText">
            {formErrors[Object.keys(formErrors)[0]] || ""}
          </div>


          <div className="btn" onClick={submitAct}>
            <button>Sign Up</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpNew24;
