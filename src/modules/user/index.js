import React from 'react'
import { Route, Routes } from "react-router-dom"

import Authenticator from '../../common/Authenticator';
import GetLoader from '../../common/GetLoader';


const QuestionDetails = React.lazy(() => import("./components/QuestionDetails"))
const ForgotPassword = React.lazy(() => import("./components/forgotpassword"))
const PinnedQuesinos = React.lazy(() => import("./components/PinnedQuesinos"))
const PostQuestion = React.lazy(() => import("./components/PostQuestion"))
const LandingPage = React.lazy(() => import("./components/landingpage"))
const ViewProfile = React.lazy(() => import("./components/ViewProfile"))
const MYQuestion = React.lazy(() => import("./components/MYQuestion"))
const SearchPage = React.lazy(() => import("./components/SearchPage"))
const MYAnswers = React.lazy(() => import("./components/MYAnswers"))
const AboutPage = React.lazy(() => import("./components/AboutUs"))
const UserLayout = React.lazy(() => import("./components/layout"))
const Contact = React.lazy(() => import("./components/ContactUS"))
const SignupPage = React.lazy(() => import("./components/signup"))
// const ChatRoom = React.lazy(() => import("./components/chatroom"))
const LoginPage = React.lazy(() => import("./components/login"))
const Profile = React.lazy(() => import("./components/Profile"))
const Error = React.lazy(() => import("../../common/Errors"))

function UserRoutes() {
    return (
        <React.Suspense fallback={<GetLoader />}>
            <Routes>
                <Route path="/*" element={<UserLayout />}>
                    <Route path='/*' element={<Authenticator role={"user"} />}>
                        <Route path="*" element={<Error />} />
                        <Route index element={<LandingPage />} />
                        <Route path='about' element={<AboutPage />} />
                        <Route path='profile' element={<Profile />} />
                        {/* <Route path='chatroom' element={<ChatRoom />} /> */}
                        <Route path='mytopics' element={<MYQuestion />} />
                        <Route path='myanswers' element={<MYAnswers />} />
                        <Route path='contact' element={<Contact />} />
                        <Route path='user/:id' element={<ViewProfile />} />
                        <Route path='pinned' element={<PinnedQuesinos />} />
                        <Route path='addquestion' element={<PostQuestion />} />
                        <Route path='search/:query' element={<SearchPage />} />
                        <Route path='question/:id' element={<QuestionDetails />} />
                    </Route>
                </Route>
                <Route path='/*' element={<Authenticator role={"user"} Auth />}>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup" element={<SignupPage />} />
                    <Route path='forgotpassword' element={<ForgotPassword />} />
                </Route>
            </Routes>
        </React.Suspense>
    );
}

export default UserRoutes