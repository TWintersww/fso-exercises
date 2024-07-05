import {render, screen} from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('test <Blog />', () => {
    let container
    let mockUpdateLike

    beforeEach(() => {
        const blog = {
            title: 'title',
            author: 'author',
            url: 'url',
            likes: 999,
            user: {
                name: 'name',
                username: 'username',
                id: 123
            }
        }
        mockUpdateLike = vi.fn()

        container = render(<Blog blog={blog} handleBlogUpdate={mockUpdateLike}/>).container
    })

    test('initially, only title and author rendered', () => {
        // screen.debug(container)
        const title = screen.getByText('title', {exact: false})
        const author = screen.getByText('author', {exact: false})
        
        const url = screen.queryByText('url')
        const likes = screen.queryByText(999, {exact: false})
        expect(url).toBeNull()
        expect(likes).toBeNull()
    })

    test('url and likes shown after button press', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        const url = screen.getByText('url')
        const likes = screen.getByText(999, {exact: false})
    })

    test('like button clicked twice', async () => {
        const user = userEvent.setup()
        const showButton = screen.getByText('view')
        await user.click(showButton)
        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockUpdateLike.mock.calls).toHaveLength(2)
    })
})
