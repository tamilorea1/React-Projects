import React, { useEffect, useState } from 'react';

function useLockBodyScroll(lock){
      useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;


        if (lock) {
          document.body.style.overflow = 'hidden';
        }
        else{
          document.body.style.overflow = originalStyle;
        }

        return () => {
          document.body.style.overflow = originalStyle;

        }

      }, [lock])
    }

const products = [
  { id: 1, name: 'Wireless Headphones', price: 99.99, category: 'Electronics', image: '🎧' },
  { id: 2, name: 'Coffee Maker', price: 149.99, category: 'Appliances', image: '☕' },
  { id: 3, name: 'Running Shoes', price: 129.99, category: 'Sports', image: '👟' },
];

// Basic Modal Component (your foundation to build on)
function BasicModal({ isOpen, onClose, title, children }) {
  // TODO: Add your modal logic here
    


    useLockBodyScroll(isOpen);

    const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };


  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);
  // - Handle escape key
  // - Handle click outside
  // - Lock body scroll
  
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

// Confirmation Modal Component
function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  // TODO: Implement confirmation modal logic
  // This should have two buttons: Cancel and Confirm
  useLockBodyScroll(isOpen)

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };


  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);


  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content confirm-modal">
        <div className="modal-header">
          <h3>{title}</h3>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          {/* TODO: Add your Cancel and Confirm buttons */}
          <button onClick={onClose}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  // Sample data for you to work with
const [users, setUsers] = useState([
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Developer', avatar: '👩‍💻' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Designer', avatar: '👨‍🎨' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Manager', avatar: '👨‍💼' },
]);

  // TODO: Add your state management here
  // You'll need states for:
  // - Which modal is open
  // - Selected user/product for detail modals
  // - Any other modal-specific state

  const [userModalOpen, setUserModalOpen] = useState(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [productModalOpen, setProductModalOpen] = useState(false)

  
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [userToDelete, setUserToDelete] = useState(null)
  
  // TODO: Implement these functions
  const openUserModal = (user) => {
    // Open user detail modal
    setUserModalOpen(true)
    setSelectedUser(user)
  };
  
  const openConfirmDelete = (userId) => {
    // Open confirmation modal for deletion
    setConfirmModalOpen(true)
    setUserToDelete(userId)
  };
  
  const openProductModal = (product) => {
    // Open product detail modal
    setProductModalOpen(true)
    setSelectedProduct(product)
  };

  const closeUserModal = () => {
    setUserModalOpen(false)
    setSelectedUser(null)
  }

  const closeConfirmModal = () => {
    setConfirmModalOpen(false)
    setUserToDelete(null)
  }

  const closeProductModal = () => {
    setProductModalOpen(false)
    setSelectedProduct(null)
  }

  const handleConfirmDelete = () => {
    setUsers(users.filter(user => user.id !== userToDelete))
    closeConfirmModal()
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Modal Practice Dashboard</h1>
        
        {/* Users Section */}
        <section className="section">
          <div className="section-header">
            <h2>Users</h2>
            {/* <button className="btn-primary" onClick={openAddUserModal}>
              Add New User
            </button> */}
          </div>
          <div className="card-grid">
            {users.map(user => (
              <div key={user.id} className="card">
                <div className="card-avatar">{user.avatar}</div>
                <h3>{user.name}</h3>
                <p className="card-subtitle">{user.role}</p>
                <div className="card-actions">
                  <button className="btn-secondary" onClick={() => openUserModal(user)}>
                    View Details
                  </button>
                  <button className="btn-danger" onClick={() => openConfirmDelete(user.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Products Section */}
        <section className="section">
          <div className="section-header">
            <h2>Products</h2>
          </div>
          <div className="card-grid">
            {products.map(product => (
              <div key={product.id} className="card">
                <div className="card-avatar">{product.image}</div>
                <h3>{product.name}</h3>
                <p className="card-subtitle">${product.price}</p>
                <div className="card-actions">
                  <button className="btn-primary" onClick={() => openProductModal(product)}>
                    Quick View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        
            {/* Render the modals */}
<BasicModal 
  isOpen={userModalOpen} 
  onClose={closeUserModal}
  title="User Details"
>
  {selectedUser && (
    <div className="user-detail">
      <div className="user-avatar">{selectedUser.avatar}</div>
      <h3>{selectedUser.name}</h3>
      <div className="user-info">
        <div className="info-item">
          <strong>Email:</strong> {selectedUser.email}
        </div>
        <div className="info-item">
          <strong>Role:</strong> {selectedUser.role}
        </div>
      </div>
    </div>
  )}
</BasicModal>

<ConfirmModal 
  isOpen={confirmModalOpen}
  onClose={closeConfirmModal}
  onConfirm={handleConfirmDelete}
  title="Delete User"
  message="Are you sure you want to delete this user? This action cannot be undone."
/>

<BasicModal 
  isOpen={productModalOpen}
  onClose={closeProductModal}
  title="Product Details"
>
  {selectedProduct && (
    <div className="product-detail">
      <div className="product-image">{selectedProduct.image}</div>
      <h3>{selectedProduct.name}</h3>
      <div className="product-price">${selectedProduct.price}</div>
      <div className="product-category">{selectedProduct.category}</div>
    </div>
  )}
</BasicModal>

      </div>
    </div>
  );
}

export default App;