INSERT INTO Users (Email, username, password, paid_through, followed_by_basic, to_unfollow, unfollowed_by_basic, is_admin, follow_basic_running, unfollow_basic_running)
values ($1, $2, $3, $4, '', '', '', false, false, false)
returning *