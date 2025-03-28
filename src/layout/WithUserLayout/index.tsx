import type { FC, ReactNode } from "react"
import CommonLayoutHeader from "../CommonLayout/CommonLayoutHeader"
import { Container } from "reactstrap"
import PanelSideBar from "./PanelSideBar"
import ThemeCustomizer from "../CommonLayout/ThemeCustomizer"
import ConversationPanel from "../CommonLayout/ConversationPanel"
import { skeltonLoaderList } from "@/Data/Layout"
import type { User } from "../LayoutTypes"
import { UserFooter } from "@/components/user/UserFooter"

interface WithUserLayoutInterFace {
  children: ReactNode
  loaderName: string
  mainClassName?: string
  user?: User
  friends?: User[]
  notfriends?: User[]
  reloadFriends?: () => void
}

const WithUserLayout: FC<WithUserLayoutInterFace> = ({
  children,
  mainClassName,
  user,
  friends,
  notfriends,
  reloadFriends,
  loaderName = "defaultLoader",
}) => {
  return (
    <>
      {skeltonLoaderList[loaderName]}
      <CommonLayoutHeader headerClassName="" user={user} />
      <Container fluid className={`page-body newsfeed-style6 ${mainClassName ? mainClassName : ""}`}>
        <PanelSideBar user={user} />
        {children}
        <ConversationPanel
          sidebarClassName=""
          friends={friends}
          notfriends={notfriends}
          me={user!}
          reloadFriends={reloadFriends}
        />
      </Container>
      <UserFooter />
      <ThemeCustomizer />
    </>
  )
}

export default WithUserLayout

