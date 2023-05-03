import RightBar from './ForumRight'
import Leftbar from './LeftBar'
import Feed from "./Feed"
import { Fragment } from 'react'
function FORUM({ onlyFeed }) {
    return (
        <div className='Forum'>
            <div className='innerFeed'>
                {onlyFeed ?
                    <Feed /> :
                    <Fragment >
                        <Leftbar />
                        <Feed />
                        <RightBar />
                    </Fragment>
                }
            </div>
        </div>
    )
}

export default FORUM

