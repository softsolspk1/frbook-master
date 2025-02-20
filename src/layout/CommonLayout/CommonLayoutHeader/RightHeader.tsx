import { FC } from "react"
import OptionList from "./OptionList"
import PostStats from "./PostStats"
import { UserInterFace } from "@/layout/LayoutTypes"

const RightHeader:FC<UserInterFace> = ({user}) => {
  return (
    <div className="header-right">
        <PostStats />
        <OptionList user={user}/>
    </div>
  )
}

export default RightHeader