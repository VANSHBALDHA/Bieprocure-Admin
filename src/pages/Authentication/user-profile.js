import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";
import withRouter from "../../components/Common/withRouter";
import { profileData } from "../../common/data/MyFackData";
import * as Yup from "yup";
import Breadcrumb from "../../components/Common/Breadcrumb";
import avatar from "../../assets/images/users/avatar-1.jpg";
import { useFormik } from "formik";

const UserProfile = () => {
  const [newAvatar, setNewAvatar] = useState(null);
  const [userDetails, setUserDetails] = useState({
    username: profileData?.name,
    phone: profileData?.phone,
    address: profileData?.address,
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: (profileData && profileData.id) || "",
      name: (profileData && profileData.name) || "",
      username: userDetails.username || "",
      phone: userDetails.phone || "",
      address: userDetails.address || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      username: Yup.string().required("Username is required"),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^\d+$/, "Phone number must be digits"),
      address: Yup.string().required("Address is required"),
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string()
        .required("New password is required")
        .min(6, "Password must be at least 6 characters"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      console.log("Form Submitted", values);
    },
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAvatar(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  document.title = "Profile | Bieprocure.";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Profile" breadcrumbItem="User profile" />

          <Row>
            <Col md="3">
              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div>
                      <div className="d-flex align-items-center justify-content-center">
                        <img
                          src={newAvatar || avatar}
                          alt="User Avatar"
                          className="avatar-md rounded-circle img-thumbnail"
                          style={{ width: "200px", height: "200px" }}
                        />
                      </div>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="9">
              <Card>
                <CardBody>
                  <Form className="form-horizontal" onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <Label className="form-label">User Name</Label>
                      <Input
                        name="username"
                        value={formik.values.username}
                        className="form-control"
                        placeholder="Enter User Name"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        invalid={
                          formik.touched.username && formik.errors.username
                            ? true
                            : false
                        }
                      />
                      {formik.touched.username && formik.errors.username && (
                        <FormFeedback type="invalid">
                          {formik.errors.username}
                        </FormFeedback>
                      )}
                    </div>

                    <div className="form-group mb-3">
                      <Label className="form-label">Phone Number</Label>
                      <Input
                        name="phone"
                        value={formik.values.phone}
                        className="form-control"
                        placeholder="Enter Phone Number"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        invalid={
                          formik.touched.phone && formik.errors.phone
                            ? true
                            : false
                        }
                      />
                      {formik.touched.phone && formik.errors.phone && (
                        <FormFeedback type="invalid">
                          {formik.errors.phone}
                        </FormFeedback>
                      )}
                    </div>

                    <div className="form-group">
                      <Label className="form-label">Address</Label>
                      <Input
                        name="address"
                        value={formik.values.address}
                        className="form-control"
                        placeholder="Enter Address"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        invalid={
                          formik.touched.address && formik.errors.address
                            ? true
                            : false
                        }
                      />
                      {formik.touched.address && formik.errors.address && (
                        <FormFeedback type="invalid">
                          {formik.errors.address}
                        </FormFeedback>
                      )}
                    </div>

                    <div className="form-group mt-4">
                      <Label className="form-label">Change Password</Label>
                      <div className="mb-2">
                        <Input
                          name="currentPassword"
                          value={formik.values.currentPassword}
                          className="form-control"
                          placeholder="Current Password"
                          type="password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          invalid={
                            formik.touched.currentPassword &&
                            formik.errors.currentPassword
                              ? true
                              : false
                          }
                        />
                        {formik.touched.currentPassword &&
                          formik.errors.currentPassword && (
                            <FormFeedback type="invalid">
                              {formik.errors.currentPassword}
                            </FormFeedback>
                          )}
                      </div>
                      <div className="mb-2">
                        <Input
                          name="newPassword"
                          value={formik.values.newPassword}
                          className="form-control"
                          placeholder="New Password"
                          type="password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          invalid={
                            formik.touched.newPassword &&
                            formik.errors.newPassword
                              ? true
                              : false
                          }
                        />
                        {formik.touched.newPassword &&
                          formik.errors.newPassword && (
                            <FormFeedback type="invalid">
                              {formik.errors.newPassword}
                            </FormFeedback>
                          )}
                      </div>
                      <div className="mb-2">
                        <Input
                          name="confirmPassword"
                          value={formik.values.confirmPassword}
                          className="form-control"
                          placeholder="Confirm New Password"
                          type="password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          invalid={
                            formik.touched.confirmPassword &&
                            formik.errors.confirmPassword
                              ? true
                              : false
                          }
                        />
                        {formik.touched.confirmPassword &&
                          formik.errors.confirmPassword && (
                            <FormFeedback type="invalid">
                              {formik.errors.confirmPassword}
                            </FormFeedback>
                          )}
                      </div>
                    </div>

                    <div className="text-center mt-4">
                      <Button type="submit" color="danger">
                        Update Profile
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(UserProfile);
