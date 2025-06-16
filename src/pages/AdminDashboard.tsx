import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { collection, getDocs, query, where, orderBy, doc, deleteDoc, updateDoc, addDoc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, updatePassword } from 'firebase/auth';
import { db } from '../config/firebase';
import { FaUsers, FaHistory, FaTrash, FaEdit, FaPlus, FaTimes, FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'manager';
  createdAt: string;
}

interface TrackingHistory {
  id: string;
  trackingId: string;
  trackingNumber: string;
  action: 'created' | 'updated' | 'deleted';
  userId: string;
  userEmail: string;
  userName: string;
  timestamp: string;
  details: string;
  changes?: string[];
}

interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user' | 'manager';
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [history, setHistory] = useState<TrackingHistory[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'history'>('users');
  const [loading, setLoading] = useState(true);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userFormData, setUserFormData] = useState<UserFormData>({
    name: '',
    email: '',
    password: '',
    role: 'manager'
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user?.role !== 'admin') {
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch users
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);
        const usersData = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as User[];
        setUsers(usersData);

        // Fetch tracking history
        const historyRef = collection(db, 'trackingHistory');
        const historyQuery = query(historyRef, orderBy('timestamp', 'desc'));
        const historySnapshot = await getDocs(historyQuery);
        const historyData = historySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as TrackingHistory[];
        setHistory(historyData);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        toast.error('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!userFormData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!userFormData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userFormData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!editingUser && !userFormData.password) {
      errors.password = 'Password is required';
    } else if (!editingUser && userFormData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      
      // Create user in Firebase Auth
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userFormData.email,
        userFormData.password
      );
      
      // Create user document in Firestore
      const userDoc = {
        name: userFormData.name,
        email: userFormData.email,
        role: userFormData.role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await setDoc(doc(db, 'users', userCredential.user.uid), userDoc);
      
      // Add to local state
      setUsers(prev => [...prev, {
        id: userCredential.user.uid,
        ...userDoc
      }]);
      
      // Reset form
      setUserFormData({
        name: '',
        email: '',
        password: '',
        role: 'manager'
      });
      setShowUserForm(false);
      
      toast.success('User created successfully');
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setUserFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role
    });
    setShowUserForm(true);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingUser) return;
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      
      // Update user document in Firestore
      const userRef = doc(db, 'users', editingUser.id);
      await updateDoc(userRef, {
        name: userFormData.name,
        email: userFormData.email,
        role: userFormData.role,
        updatedAt: new Date().toISOString()
      });
      
      // Update password if provided
      if (userFormData.password) {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (currentUser) {
          await updatePassword(currentUser, userFormData.password);
        }
      }
      
      // Update local state
      setUsers(prev => prev.map(u => 
        u.id === editingUser.id 
          ? { ...u, name: userFormData.name, email: userFormData.email, role: userFormData.role } 
          : u
      ));
      
      // Reset form
      setUserFormData({
        name: '',
        email: '',
        password: '',
        role: 'manager'
      });
      setEditingUser(null);
      setShowUserForm(false);
      
      toast.success('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }
    
    try {
      setLoading(true);
      
      // Delete user document from Firestore
      await deleteDoc(doc(db, 'users', userId));
      
      // Update local state
      setUsers(prev => prev.filter(u => u.id !== userId));
      
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  const cancelForm = () => {
    setUserFormData({
      name: '',
      email: '',
      password: '',
      role: 'manager'
    });
    setEditingUser(null);
    setShowUserForm(false);
    setFormErrors({});
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Access Denied
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              You do not have permission to access this page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('users')}
                className={`${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center`}
              >
                <FaUsers className="mr-2" />
                Users
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`${
                  activeTab === 'history'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center`}
              >
                <FaHistory className="mr-2" />
                History
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {loading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
              </div>
            ) : (
              <>
                {/* Users Tab */}
                {activeTab === 'users' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">User Management</h2>
                      <button
                        onClick={() => setShowUserForm(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                      >
                        <FaPlus className="mr-2" />
                        Add User
                      </button>
                    </div>

                    {/* User Form */}
                    {showUserForm && (
                      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {editingUser ? 'Edit User' : 'Create New User'}
                          </h3>
                          <button
                            onClick={cancelForm}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                          >
                            <FaTimes />
                          </button>
                        </div>
                        <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Name
                              </label>
                              <input
                                type="text"
                                name="name"
                                value={userFormData.name}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md ${
                                  formErrors.name
                                    ? 'border-red-500'
                                    : 'border-gray-300 dark:border-gray-600'
                                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                              />
                              {formErrors.name && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email
                              </label>
                              <input
                                type="email"
                                name="email"
                                value={userFormData.email}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md ${
                                  formErrors.email
                                    ? 'border-red-500'
                                    : 'border-gray-300 dark:border-gray-600'
                                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                              />
                              {formErrors.email && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Password {editingUser && '(leave blank to keep current)'}
                              </label>
                              <input
                                type="password"
                                name="password"
                                value={userFormData.password}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md ${
                                  formErrors.password
                                    ? 'border-red-500'
                                    : 'border-gray-300 dark:border-gray-600'
                                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                              />
                              {formErrors.password && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Role
                              </label>
                              <select
                                name="role"
                                value={userFormData.role}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              >
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                                <option value="user">User</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={cancelForm}
                              className="mr-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                            >
                              <FaSave className="mr-2" />
                              {editingUser ? 'Update User' : 'Create User'}
                            </button>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* Users Table */}
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Created At
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {users.map((user) => (
                            <tr key={user.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                {user.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                {user.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  user.role === 'admin'
                                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                    : user.role === 'manager'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                }`}>
                                  {user.role}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button 
                                  onClick={() => handleEditUser(user)}
                                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                                >
                                  <FaEdit />
                                </button>
                                <button 
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                >
                                  <FaTrash />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* History Tab */}
                {activeTab === 'history' && (
                  <div className="space-y-4">
                    {history.map((entry) => (
                      <div
                        key={entry.id}
                        className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {entry.userName} ({entry.userEmail})
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {entry.details} - Tracking #{entry.trackingNumber}
                            </p>
                            {entry.changes && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Changed fields: {entry.changes.join(', ')}
                              </p>
                            )}
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {entry.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 