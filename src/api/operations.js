import { revalidateTag } from "next/cache";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export const login = async (email, password) => {
    console.log(process.env.API_BASE);
    const res = await fetch(process.env.API_BASE + '/login', {
        method: 'POST',
        body: new URLSearchParams({
            email, password
        }),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        cache: "no-cache",
    });
    if (res.status === 200) {
        cookies().set("jwt", res.headers.get("jwt"));
        return { success: true };
    } else if (res.status === 404) {
        return { success: false, message: "User not found" };
    } else if (res.status === 401) {
        return { success: false, message: "Invalid password" };
    }
    return { success: false, message: "Server error" };
}

export const me = async () => {
    const res = await fetch(process.env.API_BASE + '/me', {
        method: 'GET',
        headers: {
            jwt: cookies().get("jwt").value
        },
    });
    if (res.status === 200) {
        var data = await res.json();
        return data.result;
    }
    return null;
}

export const getPosts = async () => {
    const res = await fetch(process.env.API_BASE + '/posts', {
        method: 'GET',
        headers: {
            jwt: cookies().get("jwt").value
        },
    });
    if (res.status === 200) {
        var data = await res.json();
        return data.result;
    }
    return null;
}

export const getArticles = async () => {
    const res = await fetch(process.env.API_BASE + '/articles', {
        method: 'GET',
        headers: {
            jwt: cookies().get("jwt").value
        },
    });
    if (res.status === 200) {
        var data = await res.json();
        return data.result;
    }
    return null;
}

export const getArticle = async (id) => {
    const res = await fetch(process.env.API_BASE + '/articles/' + id, {
        method: 'GET',
        headers: {
            jwt: cookies().get("jwt").value
        },
    });
    if (res.status === 200) {
        var data = await res.json();
        return data.result;
    }
    return null;
}

export const getChats = async (to_id) => {
    const res = await fetch(process.env.API_BASE + `/chats?to_id=${to_id}`, {
        method: 'GET',
        headers: {
            jwt: cookies().get("jwt").value
        },
    });
    if (res.status === 200) {
        var data = await res.json();
        return data.result;
    }
    return null;
}

export const getFriends = async () => {
    const res = await fetch(process.env.API_BASE + '/friends', {
        method: 'GET',
        headers: {
            jwt: cookies().get("jwt").value
        },
    });
    if (res.status === 200) {
        var data = await res.json();
        return data.result;
    }
    return null;
}

export const getNotFriends = async () => {
    const res = await fetch(process.env.API_BASE + '/notfriends', {
        method: 'GET',
        headers: {
            jwt: cookies().get("jwt").value
        },
    });
    if (res.status === 200) {
        var data = await res.json();
        return data?.result ?? null;
    }
    return null;
}

export const getComments = async (post_id) => {
    const res = await fetch(process.env.API_BASE + `/posts/${post_id}/comment`, {
        method: 'GET',
        headers: {
            jwt: cookies().get("jwt").value
        },
    });
    if (res.status === 200) {
        var data = await res.json();
        return data.result;
    }
    return null;
}

export const register = async (name, password, email) => {

    const res = await fetch(process.env.API_BASE + '/users', {
        method: 'POST',
        body: new URLSearchParams({
            name, password, email
        }),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        cache: "no-cache",
    });

    if (res.status !== 200) {
        return { success: false, message: "Server error" };
    }

    var data = await res.json();
    if (data.code === 200) {
        cookies().set("jwt", res.headers.get("jwt"));
        return { success: true };
    }
    return { success: false, message: data.error ?? "Server error" };
}

export const updateMe = async (profile_pic) => {
    const res = await fetch(process.env.API_BASE + '/me', {
        method: 'POST',
        body: new URLSearchParams({
            profile_pic
        }),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            jwt: cookies().get("jwt").value
        },
        cache: "no-cache",
    });

    if (res.status !== 200) {
        return { success: false, message: "Server error" };
    }

    var data = await res.json();
    if (data.code === 200) {
        return { success: true };
    }
    return { success: false, message: data.error ?? "Server error" };
}

export const addChat = async (content, to_id) => {
    const res = await fetch(process.env.API_BASE + '/add-chat', {
        method: 'POST',
        body: new URLSearchParams({
            content, to_id
        }),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            jwt: cookies().get("jwt").value
        },
        cache: "no-cache",
    });

    if (res.status !== 200) {
        return { success: false, message: "Server error" };
    }

    var data = await res.json();
    if (data.code === 200) {
        return { success: true };
    }
    return { success: false, message: data.error ?? "Server error" };
}

export const acceptFr = async (id) => {
    console.log("hello welcome");
    const res = await fetch(process.env.API_BASE + `/friend-requests/${id}/accept`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            jwt: cookies().get("jwt").value
        },
        cache: "no-cache",
    });

    if (res.status !== 200) {
        return { success: false, message: "Server error" };
    }

    var data = await res.json();
    if (data.code === 200) {
        return { success: true };
    }
    return { success: false, message: data.error ?? "Server error" };
}

export const rejectFr = async (id) => {
    const res = await fetch(process.env.API_BASE + `/friend-requests/${id}/reject`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            jwt: cookies().get("jwt").value
        },
        cache: "no-cache",
    });

    if (res.status !== 200) {
        return { success: false, message: "Server error" };
    }

    var data = await res.json();
    if (data.code === 200) {
        return { success: true };
    }
    return { success: false, message: data.error ?? "Server error" };
}


export const sendFr = async (to_id) => {
    const res = await fetch(process.env.API_BASE + '/friend-requests', {
        method: 'POST',
        body: new URLSearchParams({
            to_id
        }),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            jwt: cookies().get("jwt").value
        },
        cache: "no-cache",
    });
    console.log("oioiio");
    if (res.status !== 200) {
        return { success: false, message: "Server error" };
    }
    console.log(res.status);

    var data = await res.json();
    if (data.code === 200) {
        return { success: true };
    }
    return { success: false, message: data.error ?? "Server error" };
}


export const likePost = async (post_id) => {
    const res = await fetch(process.env.API_BASE + `/posts/${post_id}/like`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            jwt: cookies().get("jwt").value
        },
        cache: "no-cache",
    });

    if (res.status !== 200) {
        return { success: false, message: "Server error" };
    }

    var data = await res.json();
    if (data.code === 200) {
        return { success: true };
    }
    return { success: false, message: data.error ?? "Server error" };
}

export const unlikePost = async (post_id) => {
    const res = await fetch(process.env.API_BASE + `/posts/${post_id}/unlike`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            jwt: cookies().get("jwt").value
        },
        cache: "no-cache",
    });

    if (res.status !== 200) {
        return { success: false, message: "Server error" };
    }

    var data = await res.json();
    if (data.code === 200) {
        return { success: true };
    }
    return { success: false, message: data.error ?? "Server error" };
}

export const addComment = async (post_id, content) => {
    const res = await fetch(process.env.API_BASE + `/posts/${post_id}/comment`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            jwt: cookies().get("jwt").value
        },
        body: new URLSearchParams({
            content
        }),
        cache: "no-cache",
    });

    if (res.status !== 200) {
        return { success: false, message: "Server error" };
    }

    var data = await res.json();
    if (data.code === 200) {
        return { success: true };
    }
    return { success: false, message: data.error ?? "Server error" };
}

export const createPost = async (title, content, image, video) => {

    const res = await fetch(process.env.API_BASE + '/posts', {
        method: 'POST',
        body: new URLSearchParams({
            title, content, image, video
        }),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            jwt: cookies().get("jwt").value
        },
        cache: "no-cache",
    });

    if (res.status !== 200) {
        return { success: false, message: "Server error" };
    }

    var data = await res.json();
    if (data.code === 200) {
        return { success: true };
    }
    return { success: false, message: data.error ?? "Server error" };
}


export const createArticle = async (title, content, image, tags, desc, author_name, pdf) => {

    const res = await fetch(process.env.API_BASE + '/articles', {
        method: 'POST',
        body: new URLSearchParams({
            title: title, content: content, photo: image, tags: tags, description: desc, author_name: author_name, pdf: pdf
        }),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            jwt: cookies().get("jwt").value
        },
        cache: "no-cache",
    });

    if (res.status !== 200) {
        return { success: false, message: "Server error" };
    }

    var data = await res.json();
    if (data.code === 200) {
        return { success: true };
    }
    return { success: false, message: data.error ?? "Server error" };
}


export const startVer = async () => {
    const res = await fetch(process.env.API_BASE + '/start-verification', {
        method: 'POST',
        headers: {
            jwt: cookies().get("jwt").value
        },
        cache: "no-cache",
    });

    if (res.status !== 200) {
        return { success: false, message: "Server error" };
    }

    var data = await res.json();
    if (data.code === 200) {
        return { success: true };
    }
    return { success: false, message: data.error ?? "Server error" };
}

export const completeVer = async (otp) => {
    const res = await fetch(process.env.API_BASE + '/complete-registration', {
        method: 'POST',
        body: new URLSearchParams({
            otp
        }),
        headers: {
            jwt: cookies().get("jwt").value
        },
        cache: "no-cache",
    });

    if (res.status !== 200) {
        return { success: false, message: "Server error" };
    }

    var data = await res.json();
    if (data.code === 200) {
        return { success: true };
    }
    return { success: false, message: data.error ?? "Server error" };
}