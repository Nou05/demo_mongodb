// Biến để theo dõi trạng thái cập nhật
let isEditing = false;

// Lấy danh sách người dùng khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
    setupEventListeners();
});

// Thiết lập các trình xử lý sự kiện
function setupEventListeners() {
    // Xử lý submit form
    document.getElementById('userForm').addEventListener('submit', function(e) {
        e.preventDefault();
        if (isEditing) {
            updateUser();
        } else {
            createUser();
        }
    });

    // Xử lý nút hủy
    document.getElementById('cancelBtn').addEventListener('click', function() {
        resetForm();
    });
}

// Lấy danh sách người dùng từ API
function fetchUsers() {
    fetch('/api/users')
        .then(response => response.json())
        .then(users => {
            displayUsers(users);
        })
        .catch(error => {
            console.error('Lỗi khi lấy danh sách người dùng:', error);
            alert('Không thể tải danh sách người dùng. Vui lòng thử lại sau.');
        });
}

// Hiển thị danh sách người dùng
function displayUsers(users) {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone || ''}</td>
            <td>${user.address || ''}</td>
            <td>
                <button class="btn btn-sm btn-edit btn-action" data-id="${user._id}">Sửa</button>
                <button class="btn btn-sm btn-delete btn-action" data-id="${user._id}">Xóa</button>
            </td>
        `;

        // Thêm sự kiện cho nút sửa
        row.querySelector('.btn-edit').addEventListener('click', () => {
            editUser(user._id);
        });

        // Thêm sự kiện cho nút xóa
        row.querySelector('.btn-delete').addEventListener('click', () => {
            if (confirm('Bạn có chắc muốn xóa người dùng này?')) {
                deleteUser(user._id);
            }
        });

        userList.appendChild(row);
    });
}

// Thêm người dùng mới
function createUser() {
    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value
    };

    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Server responded with an error');
        }
        return response.json();
    })
    .then(newUser => {
        fetchUsers();
        resetForm();
        alert('Người dùng đã được thêm thành công!');
    })
    .catch(error => {
        console.error('Lỗi khi thêm người dùng:', error);
        alert('Không thể thêm người dùng. Vui lòng thử lại.');
    });
}

// Lấy thông tin người dùng để chỉnh sửa
function editUser(userId) {
    fetch(`/api/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            // Điền thông tin vào form
            document.getElementById('userId').value = user._id;
            document.getElementById('name').value = user.name;
            document.getElementById('email').value = user.email;
            document.getElementById('phone').value = user.phone || '';
            document.getElementById('address').value = user.address || '';

            // Cập nhật trạng thái form
            document.getElementById('formTitle').textContent = 'Cập nhật thông tin người dùng';
            document.getElementById('submitBtn').textContent = 'Cập nhật';
            document.getElementById('cancelBtn').style.display = 'inline-block';
            isEditing = true;
        })
        .catch(error => {
            console.error('Lỗi khi lấy thông tin người dùng:', error);
            alert('Không thể lấy thông tin người dùng. Vui lòng thử lại.');
        });
}

// Cập nhật thông tin người dùng
function updateUser() {
    const userId = document.getElementById('userId').value;
    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value
    };

    fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Server responded with an error');
        }
        return response.json();
    })
    .then(updatedUser => {
        fetchUsers();
        resetForm();
        alert('Thông tin người dùng đã được cập nhật!');
    })
    .catch(error => {
        console.error('Lỗi khi cập nhật thông tin người dùng:', error);
        alert('Không thể cập nhật thông tin người dùng. Vui lòng thử lại.');
    });
}

// Xóa người dùng
function deleteUser(userId) {
    fetch(`/api/users/${userId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Server responded with an error');
        }
        return response.json();
    })
    .then(data => {
        fetchUsers();
        alert('Người dùng đã được xóa thành công!');
    })
    .catch(error => {
        console.error('Lỗi khi xóa người dùng:', error);
        alert('Không thể xóa người dùng. Vui lòng thử lại.');
    });
}

// Reset form về trạng thái ban đầu
function resetForm() {
    document.getElementById('userForm').reset();
    document.getElementById('userId').value = '';
    document.getElementById('formTitle').textContent = 'Thêm người dùng mới';
    document.getElementById('submitBtn').textContent = 'Thêm';
    document.getElementById('cancelBtn').style.display = 'none';
    isEditing = false;
}