class UserManager {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('dinoGameUsers')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('dinoGameCurrentUser')) || null;
    }

    // 注册新用户
    register(username, password) {
        // 检查用户名是否已存在
        if (this.users.some(user => user.username === username)) {
            return { success: false, message: '昵称已存在' };
        }

        // 创建新用户
        const newUser = {
            id: Date.now().toString(),
            username,
            password,
            highScore: 0,
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        this.saveUsers();

        return { success: true, user: newUser };
    }

    // 用户登录
    login(username, password) {
        const user = this.users.find(u => u.username === username && u.password === password);

        if (user) {
            this.currentUser = user;
            localStorage.setItem('dinoGameCurrentUser', JSON.stringify(user));
            return { success: true, user };
        } else {
            return { success: false, message: '用户名或密码错误' };
        }
    }

    // 用户退出
    logout() {
        this.currentUser = null;
        localStorage.removeItem('dinoGameCurrentUser');
    }

    // 更新用户最高分
    updateHighScore(userId, score) {
        const user = this.users.find(u => u.id === userId);
        if (user && score > user.highScore) {
            user.highScore = score;

            // 如果当前用户是得分用户，也更新当前用户信息
            if (this.currentUser && this.currentUser.id === userId) {
                this.currentUser.highScore = score;
                localStorage.setItem('dinoGameCurrentUser', JSON.stringify(this.currentUser));
            }

            this.saveUsers();
            return true;
        }
        return false;
    }

    // 获取排行榜数据
    getLeaderboard() {
        return this.users
            .filter(user => user.highScore > 0)
            .sort((a, b) => b.highScore - a.highScore)
            .slice(0, 10);
    }

    // 保存用户数据到localStorage
    saveUsers() {
        localStorage.setItem('dinoGameUsers', JSON.stringify(this.users));
    }
}
