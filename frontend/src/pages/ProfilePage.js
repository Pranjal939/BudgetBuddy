import React, { useState } from 'react';
import { FaUserCircle, FaEdit, FaLock, FaSignOutAlt, FaCheckCircle, FaCamera } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../components/Sidebar.css';
import './InnerPages.css';

const ProfilePage = () => {
  const [tab, setTab] = useState('profile');
  const [profile, setProfile] = useState({ name:'Priya Sharma', email:'priya@email.com', mobile:'9876543210', dob:'2008-05-15', college:'Delhi University' });
  const [editMode, setEditMode] = useState(false);
  const [tempProfile, setTempProfile] = useState({...profile});
  const [passwords, setPasswords] = useState({ current:'', newPass:'', confirm:'' });
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(''),3000); };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile({...tempProfile});
    setEditMode(false);
    showToast('Profile updated successfully!');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirm) { showToast('Passwords do not match!'); return; }
    setPasswords({ current:'', newPass:'', confirm:'' });
    showToast('Password changed successfully!');
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <div className="page-header">
          <h2 className="page-title">Profile</h2>
          <p className="page-sub">Manage your account information</p>
        </div>

        {toast && <div className="success-toast"><FaCheckCircle /> {toast}</div>}

        <div className="row g-4">
          {/* Profile Card */}
          <div className="col-lg-4">
            <div className="inner-card text-center">
              <div className="profile-avatar-wrap">
                <div className="profile-big-avatar">{profile.name[0]}</div>
                <button className="avatar-camera"><FaCamera /></button>
              </div>
              <h4 className="profile-name">{profile.name}</h4>
              <p className="profile-email">{profile.email}</p>
              <p className="profile-college">🎓 {profile.college}</p>
              <div className="profile-stats">
                <div className="ps-item"><strong>42</strong><span>Expenses</span></div>
                <div className="ps-item"><strong>₹4,200</strong><span>This Month</span></div>
                <div className="ps-item"><strong>3</strong><span>Goals</span></div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="col-lg-8">
            <div className="inner-card">
              <div className="profile-tabs">
                <button className={`ptab ${tab==='profile'?'active':''}`} onClick={()=>setTab('profile')}><FaUserCircle /> Edit Profile</button>
                <button className={`ptab ${tab==='password'?'active':''}`} onClick={()=>setTab('password')}><FaLock /> Change Password</button>
              </div>

              {/* Edit Profile Tab */}
              {tab === 'profile' && (
                <form onSubmit={handleSaveProfile}>
                  <div className="row g-3">
                    {[
                      {label:'Full Name', key:'name', type:'text', placeholder:'Your full name'},
                      {label:'Email Address', key:'email', type:'email', placeholder:'your@email.com'},
                      {label:'Mobile Number', key:'mobile', type:'tel', placeholder:'10-digit number'},
                      {label:'Date of Birth', key:'dob', type:'date', placeholder:''},
                      {label:'College / University', key:'college', type:'text', placeholder:'Your institution'},
                    ].map(field => (
                      <div className="col-md-6" key={field.key}>
                        <div className="form-group-bb">
                          <label>{field.label}</label>
                          <input type={field.type} className="bb-form-input"
                            placeholder={field.placeholder}
                            value={tempProfile[field.key]}
                            disabled={!editMode}
                            onChange={e=>setTempProfile({...tempProfile,[field.key]:e.target.value})} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="profile-btns">
                    {editMode ? (
                      <>
                        <button type="submit" className="submit-btn"><FaCheckCircle /> Save Changes</button>
                        <button type="button" className="cancel-btn" onClick={()=>{setEditMode(false);setTempProfile({...profile});}}>Cancel</button>
                      </>
                    ) : (
                      <button type="button" className="edit-profile-btn" onClick={()=>setEditMode(true)}><FaEdit /> Edit Profile</button>
                    )}
                  </div>
                </form>
              )}

              {/* Change Password Tab */}
              {tab === 'password' && (
                <form onSubmit={handleChangePassword}>
                  {[
                    {label:'Current Password', key:'current', placeholder:'Enter current password'},
                    {label:'New Password', key:'newPass', placeholder:'Enter new password'},
                    {label:'Confirm New Password', key:'confirm', placeholder:'Repeat new password'},
                  ].map(field => (
                    <div className="form-group-bb" key={field.key}>
                      <label>{field.label}</label>
                      <input type="password" className="bb-form-input" placeholder={field.placeholder}
                        value={passwords[field.key]}
                        onChange={e=>setPasswords({...passwords,[field.key]:e.target.value})} required />
                    </div>
                  ))}
                  <button type="submit" className="submit-btn"><FaLock /> Change Password</button>
                </form>
              )}
            </div>

            {/* Logout */}
            <div className="inner-card mt-4 logout-card">
              <div className="logout-info">
                <FaSignOutAlt style={{color:'#ef4444', fontSize:'1.3rem'}} />
                <div>
                  <h6>Sign Out</h6>
                  <p>You will be logged out of your BudgetBuddy account.</p>
                </div>
              </div>
              <Link to="/" className="logout-btn">Logout</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
