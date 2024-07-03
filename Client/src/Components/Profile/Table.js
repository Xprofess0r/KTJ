import React, { Component, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./Table.module.css";
import responsiveObserve from "antd/lib/_util/responsiveObserve";
import ReactGa from "react-ga";
import Button from "@material-ui/core/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "../../api";
import { useSelector } from 'react-redux';
// import {useForm} from 'react-hook-form'
import { updateUserInfo } from "../../actions/authActions";

const PayUpates = ()=>{
  const auth = useSelector((state) => state.auth);
  const id = auth.user?.ktjID;

  useEffect(() => {

    if(id)
    axios
    .post('/getPay', {ktjid : id } )
    .then((response) => {
      const data = response.data;
      if(data.paid == "yes" )
      {
        localStorage.setItem("pkey","yes");
      }else{
        localStorage.setItem("pkey","no");
      }
    })
    .catch((error) => console.log('err', error))
  }, [])
  

  return(
    <></>
  )
}

class Table extends Component {
  constructor(props) {
    super();
    this.state = {
      errors: {regError: null,},
      name: "",
      gender: "",
      phone: "",
      department: "",
      email: "",
      city: "",
      state: "",
      ktjID: "",
      collegeid: "",
      events: [],
      isEditing: false,
      paid: "no"
    };
    // this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.OnEditingHandler = this.OnEditingHandler.bind(this);
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  OnEditingHandler = (e) =>{
    e.preventDefault();
    this.setState({isEditing: true})
  }
  onSubmitHandler = (e) => {
    
    e.preventDefault();

    console.log("hello");
    let url = "/updateProfile";
    let body = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      gender: document.getElementById("gender").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      college: this.props.auth.user.college,
      collegeid: document.getElementById("clgid").value.trim(),
      department: document.getElementById("dep").value.trim(),
      city: document.getElementById("city").value.trim(),
      state: document.getElementById("state").value.trim(),
    };
    axios
      .post(url, body)
      .then((res) => {
        // console.log("res:", res);
        this.props.updateUserInfo(this.props.auth.user._id);
        this.setState({
          isEditing: false,
          errors: {regError: null,}
        });
      })
      .catch((error) => {
        var newErr = this.state.errors;
        newErr.regError = error?.response?.data?.message;
        this.setState({
          errors: newErr,
        });
        
      });
  };
  componentDidMount() {
    // const auth = useSelector(state => state.auth);
    // const id = auth.user.ktjID;

    // axios
    // .post('/getPay', {ktjid : id } )
    // .then((response) => {
    //   const data = response.data;
    //   if(data.paid == "yes" )
    //   {
    //     localStorage.setItem("pkey","yes");
    //   }else{
    //     localStorage.setItem("pkey","no");
    //   }
    // })
    // .catch((error) => console.log('err', error))

    let competitions = this.props.auth.user?.competitions?.map((comp) => {
      return comp.title;
    });
    let games = this.props.auth.user?.games?.map((g) => {
      return g.title;
    });
    let events;
    if (competitions) {
      events = [...competitions];
    }
    if (games) {
      events = [...events, ...games];
    }
    this.setState({
      events: events,
    });
    this.setState({
      name: this.props.auth.user.username,
      gender: this.props.auth.user.gender,
      phone: this.props.auth.user.phone,
      department: this.props.auth.user.department,
      city: this.props.auth.user.city,
      state: this.props.auth.user.state,
      collegeid: this.props.auth.user.collegeid,
      ktjID: this.props.auth.user.ktjID, 
      email: this.props.auth.user.email,
    });
  }
  render() {
    return (
      <div className={classes.head}>
        <PayUpates/>
        {this.state.isEditing ? (
          <div className={classes.form}>
            <form
              className={classes.ftag}
              id="form"
              onSubmit={this.onSubmitHandler}
            >
              <div className={classes.IForm}>
                <div className={classes.fNameR}>
                  {/* <div className={classes.fkeyName}></div> */}
                  <input
                    className={classes.fvalueName}
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    value={this.state.name}
                    required
                    onChange={this.onChangeHandler}
                  />
                </div>

                <div className={classes.Row}>
                  <div className={classes.fkey}>{"KTJ ID :"}</div>
                  <input
                    className={classes.fvalue}
                    name="ktjID"
                    id="ktjID"
                    type="text"
                    value={this.state.ktjID}
                    disabled
                    required
                  />
                </div>

                <div className={classes.Row}>
                  <div className={classes.fkey}>{"Email ID :"}</div>
                  <input
                    className={classes.fEvalue}
                    name="email"
                    id="email"
                    type="text"
                    placeholder="Email"
                    disabled
                    value={this.state.email}
                    required
                  />
                </div>

                <div className={classes.Row}>
                  <div className={classes.fkey}>{"Contact Number :"}</div>
                  <input
                    className={classes.fvalue}
                    name="phone"
                    id="phone"
                    type="text"
                    pattern="[1-9]{1}[0-9]{9}"
                    value={this.state.phone}
                    placeholder="Contact Number"
                    onChange={this.onChangeHandler}
                    required
                  />
                </div>
                {this.state.errors.regError != null ? (
                  <div className={classes.EmptyError}>
                    {this.state.errors.regError}
                  </div>
                ) : (
                  <div className={classes.EmptyError}></div>
                )}
                <div className={classes.Row}>
                  <div className={classes.Gkey}>{"Gender :"}</div>
                  <select
                    name="gender"
                    required
                    id="gender"
                    className={classes.SG}
                    onChange={this.onChangeHandler}
                    value={this.state.gender}
                  >
                    <option className={classes.OG} value="Male">
                      Male
                    </option>
                    <option className={classes.OG} value="Female">
                      Female
                    </option>
                    <option className={classes.OG} value="Other">
                      Other
                    </option>
                  </select>
                </div>

                <div className={classes.Row}>
                  <div className={classes.fkey}>{"College ID :"}</div>
                  <input
                    className={classes.fvalue}
                    name="collegeid"
                    id="clgid"
                    type="text"
                    value={this.state.collegeid}
                    placeholder="College ID"
                    onChange={this.onChangeHandler}
                    required
                  />
                </div>

                <div className={classes.Row}>
                  <div className={classes.fkey}>{"Department :"}</div>
                  <input
                    className={classes.fvalue}
                    id="dep"
                    name="department"
                    type="text"
                    placeholder="Department"
                    value={this.state.department}
                    onChange={this.onChangeHandler}
                    required
                  />
                </div>

                <div className={classes.Row}>
                  <div className={classes.fkey}>{"City State :"}</div>
                  <input
                    className={classes.fCSvalue1}
                    id="city"
                    name="city"
                    type="text"
                    placeholder="City"
                    required
                    value={this.state.city}
                    onChange={this.onChangeHandler}
                  />

                  <input
                    className={classes.fCSvalue2}
                    id="state"
                    name="state"
                    type="text"
                    placeholder="State"
                    value={this.state.state}
                    onChange={this.onChangeHandler}
                    required
                  />
                </div>

                <div className={classes.Row}>
                  <div className={classes.fkey}>{"Accommodation :"}</div>
                  <input
                    className={classes.fEvalue}
                    name="accommodation"
                    id="Accommodation"
                    type="text"
                    placeholder="Accommodation"
                    disabled
                    value={localStorage.getItem("pkey")==="yes"? "Yes" : "No"}
                    required
                  />
                </div>

                <div className={classes.ERow}>
                  <div className={classes.fkey}>{"Registered Events :"}</div>
                  <div className={classes.fTvalue}>
                    {this.state.events?.sort().map(
                      (value, index) =>
                        // <tr  key= {index}>
                        //   <td className={classes.ftd}>{value}</td>
                        // </tr>
                        (index > 0 ? ", " : "") + value
                    )}
                  </div>
                </div>
              </div>

              <div className={classes.SPBdiv}>
                <button type="submit" className={classes.SPButton}>
                  Save Details
                </button>
                <br />
              </div>
            </form>
          </div>
        ) : (
          <div className={classes.form}>
            <form
              className={classes.ftag}
              id="form"
              onSubmit={this.OnEditingHandler}
            >
              <div className={classes.IForm}>
                <div className={classes.fNameR}>
                  {/* <div className={classes.fkeyName}></div> */}
                  <input
                    className={classes.fvalueName}
                    // id="name"
                    name="name"
                    type="text"
                    disabled
                    placeholder="Full Name"
                    value={this.state.name}
                    required
                    onChange={this.onChangeHandler}
                  />
                </div>

                <div className={classes.Row}>
                  <div className={classes.fkey}>{"KTJ ID :"}</div>
                  <input
                    className={classes.fvalue}
                    name="ktjID"
                    id="ktjID"
                    type="text"
                    value={this.state.ktjID}
                    disabled
                    required
                  />
                </div>

                <div className={classes.Row}>
                  <div className={classes.fkey}>{"Email ID :"}</div>
                  <input
                    className={classes.fEvalue}
                    name="email"
                    id="email"
                    type="text"
                    disabled
                    placeholder="Email"
                    value={this.state.email}
                    required
                  />
                </div>

                <div className={classes.Row}>
                  <div className={classes.fkey}>{"Contact Number :"}</div>
                  <input
                    className={classes.fvalue}
                    name="phone"
                    id="phone"
                    type="text"
                    disabled
                    pattern="[1-9]{1}[0-9]{9}"
                    value={this.state.phone}
                    placeholder="Contact Number"
                    onChange={this.onChangeHandler}
                    required
                  />
                </div>
                {this.state.errors.regError != null ? (
                  <div className={classes.EmptyError}>
                    {this.state.errors.regError}
                  </div>
                ) : (
                  <div className={classes.EmptyError}></div>
                )}
                <div className={classes.Row}>
                  <div className={classes.Gkey}>{"Gender :"}</div>
                  <input
                    className={classes.fvalue}
                    name="gender"
                    id="gender"
                    type="text"
                    disabled
                    value={this.state.gender}
                    placeholder="Gender"
                    onChange={this.onChangeHandler}
                    required
                  />
                  {/* <select
                    disabled
                    name="gender"
                    required
                    id="gender"
                    className={classes.SG}
                    onChange={this.onChangeHandler}
                    value={this.state.gender}
                  >
                    <option className={classes.OG} value="Male">
                      Male
                    </option>
                    <option className={classes.OG} value="Female">
                      Female
                    </option>
                    <option className={classes.OG} value="Other">
                      Other
                    </option>
                  </select> */}
                </div>

                <div className={classes.Row}>
                  <div className={classes.fkey}>{"College ID :"}</div>
                  <input
                    className={classes.fvalue}
                    name="collegeid"
                    id="clgid"
                    type="text"
                    disabled
                    value={this.state.collegeid}
                    placeholder="College ID"
                    onChange={this.onChangeHandler}
                    required
                  />
                </div>

                <div className={classes.Row}>
                  <div className={classes.fkey}>{"Department :"}</div>
                  <input
                    disabled
                    className={classes.fvalue}
                    id="dep"
                    name="department"
                    type="text"
                    placeholder="Department"
                    value={this.state.department}
                    onChange={this.onChangeHandler}
                    required
                  />
                </div>

                <div className={classes.Row}>
                  <div className={classes.fkey}>{"City State :"}</div>
                  <input
                    className={classes.fCSvalue1}
                    id="city"
                    name="city"
                    disabled
                    type="text"
                    placeholder="City"
                    required
                    value={`${this.state.city}, ${this.state.state}`}
                    onChange={this.onChangeHandler}
                  />

                  {/* <input
                    className={classes.fCSvalue2}
                    id="state"
                    name="state"
                    disabled
                    type="text"
                    placeholder="State"
                    value={this.state.state}
                    onChange={this.onChangeHandler}
                    required
                  /> */}
                </div>

                <div className={classes.Row}>
                  <div className={classes.fkey}>{"Accommodation :"}</div>
                  <input
                    disabled
                    className={classes.fvalue}
                    id="Accommodation"
                    name="accommodation"
                    type="text"
                    placeholder="Accommodation"
                    value={localStorage.getItem("pkey")==="yes"? "Yes" : "No"}
                    onChange={this.onChangeHandler}
                    required
                  />
                </div>
                <div className={classes.ERow}>
                  <div className={classes.fkey}>{"Registered Events :"}</div>
                  <div className={classes.fTvalue}>
                    {this.state.events?.sort().map(
                      (value, index) =>
                        // <tr  key= {index}>
                        //   <td className={classes.ftd}>{value}</td>
                        // </tr>
                        (index > 0 ? ", " : "") + value
                    )}
                  </div>
                </div>
              </div>

              <div className={classes.SPBdiv}>
                <button
                  className={classes.SPButton}
                  type="submit"
                  onClick={(e) => {
                    ReactGa.event({
                      category: "Click",
                      action: "Clicked Edit Profile button",
                    });
                  }}
                >
                  Edit Details
                </button>
                <br />
              </div>
            </form>
          </div>
        )}
        <div className={classes.imgDiv}>
        <img
          src="https://raw.githubusercontent.com/KSHITIJ-2024/media/a35b5c2b4a3e10c9ca5fc3ad69b4f286d1adc40b/astro%2Bsatellite.png"
          className={classes.image1}
        />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { updateUserInfo })(withRouter(Table));
