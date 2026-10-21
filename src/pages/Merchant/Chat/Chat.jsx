import { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCheck,
  Headphones,
  MessageCircle,
  MoreVertical,
  Search,
  Send,
  Smile,
} from "lucide-react";

import styles from "./Chat.module.css";

const initialConversations = [
  {
    id: 1,
    name: "فريق الدعم الفني",
    avatar: "د",
    color: "blue",
    online: true,
    unread: 2,
    time: "02:45 م",
    messages: [
      {
        id: 1,
        text: "أهلًا بيك في Joker! 👋",
        time: "02:30 م",
        sender: "them",
      },
      {
        id: 2,
        text: "إزاي نقدر نساعدك النهارده؟",
        time: "02:31 م",
        sender: "them",
      },
      {
        id: 3,
        text: "كنت عايز استفسر عن الباقات المتاحة.",
        time: "02:40 م",
        sender: "me",
      },
      {
        id: 4,
        text: "أكيد، هنساعدك بكل سرور. ممكن تحدد الباقة اللي محتاج تعرف تفاصيلها؟",
        time: "02:45 م",
        sender: "them",
      },
    ],
  },
  {
    id: 2,
    name: "خدمة العملاء",
    avatar: "ع",
    color: "purple",
    online: true,
    unread: 0,
    time: "أمس",
    messages: [
      {
        id: 1,
        text: "مرحبًا! إزاي نقدر نساعدك؟",
        time: "11:15 ص",
        sender: "them",
      },
      {
        id: 2,
        text: "كنت محتاج أعرف تفاصيل حسابي.",
        time: "11:20 ص",
        sender: "me",
      },
      {
        id: 3,
        text: "تحت أمرك، ابعتلنا استفسارك بالتفصيل.",
        time: "11:22 ص",
        sender: "them",
      },
    ],
  },
  {
    id: 3,
    name: "متابعة الطلبات",
    avatar: "ط",
    color: "orange",
    online: false,
    unread: 0,
    time: "الأحد",
    messages: [
      {
        id: 1,
        text: "تم استلام طلبك بنجاح.",
        time: "09:10 ص",
        sender: "them",
      },
      {
        id: 2,
        text: "شكرًا ليكم.",
        time: "09:14 ص",
        sender: "me",
      },
    ],
  },
];

function formatTime() {
  return new Intl.DateTimeFormat("ar-EG", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

export default function Chat() {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedId, setSelectedId] = useState(1);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [mobileChatOpen, setMobileChatOpen] = useState(false);

  const selectedConversation = conversations.find(
    (conversation) => conversation.id === selectedId,
  );

  const filteredConversations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return conversations.filter((conversation) => {
      const lastMessage =
        conversation.messages[conversation.messages.length - 1]?.text || "";

      return (
        conversation.name.toLowerCase().includes(query) ||
        lastMessage.toLowerCase().includes(query)
      );
    });
  }, [conversations, search]);

  const openConversation = (conversation) => {
    setSelectedId(conversation.id);
    setMobileChatOpen(true);

    setConversations((current) =>
      current.map((item) =>
        item.id === conversation.id ? { ...item, unread: 0 } : item,
      ),
    );
  };

  const sendMessage = (event) => {
    event.preventDefault();

    const text = message.trim();

    if (!text || !selectedConversation) return;

    const newMessage = {
      id: Date.now(),
      text,
      time: formatTime(),
      sender: "me",
    };

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === selectedId
          ? {
              ...conversation,
              time: "الآن",
              messages: [...conversation.messages, newMessage],
            }
          : conversation,
      ),
    );

    setMessage("");
  };

  return (
    <div className={styles.page} dir="rtl">
      <header className={styles.pageHeader}>
        <div className={styles.heading}>
          <div className={styles.headingIcon}>
            <MessageCircle size={23} />
          </div>

          <div>
            <h1>الشات والدعم</h1>
            <p>تواصل مع فريقنا واحصل على المساعدة اللي تحتاجها.</p>
          </div>
        </div>

        <div className={styles.supportStatus}>
          <span className={styles.statusDot} />
          فريق الدعم متاح
        </div>
      </header>

      <section className={styles.chatCard}>
        <aside
          className={`${styles.sidebar} ${
            mobileChatOpen ? styles.sidebarHidden : ""
          }`}
        >
          <div className={styles.sidebarHeader}>
            <div>
              <h2>المحادثات</h2>
              <span>{conversations.length} محادثات</span>
            </div>

            <div className={styles.sidebarIcon}>
              <Headphones size={20} />
            </div>
          </div>

          <label className={styles.searchBox}>
            <Search size={18} />
            <input
              type="search"
              placeholder="ابحث في المحادثات..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <div className={styles.conversationList}>
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conversation) => {
                const lastMessage =
                  conversation.messages[conversation.messages.length - 1];

                return (
                  <button
                    key={conversation.id}
                    type="button"
                    className={`${styles.conversation} ${
                      selectedId === conversation.id
                        ? styles.activeConversation
                        : ""
                    }`}
                    onClick={() => openConversation(conversation)}
                  >
                    <div
                      className={`${styles.avatar} ${
                        styles[conversation.color]
                      }`}
                    >
                      {conversation.avatar}
                      {conversation.online && (
                        <span className={styles.onlineIndicator} />
                      )}
                    </div>

                    <div className={styles.conversationInfo}>
                      <div className={styles.conversationTop}>
                        <h3>{conversation.name}</h3>
                        <span className={styles.conversationTime}>
                          {conversation.time}
                        </span>
                      </div>

                      <div className={styles.conversationBottom}>
                        <p>{lastMessage?.text}</p>
                        {conversation.unread > 0 && (
                          <span className={styles.unreadBadge}>
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className={styles.emptySearch}>
                <Search size={24} />
                <p>مفيش محادثات مطابقة للبحث.</p>
              </div>
            )}
          </div>

          <div className={styles.sidebarFooter}>
            <span className={styles.footerIcon}>
              <Headphones size={18} />
            </span>
            <div>
              <strong>محتاج مساعدة؟</strong>
              <p>فريقنا موجود علشان يساعدك.</p>
            </div>
          </div>
        </aside>

        <main
          className={`${styles.chatPanel} ${
            !mobileChatOpen ? styles.chatPanelHidden : ""
          }`}
        >
          {selectedConversation ? (
            <>
              <div className={styles.chatHeader}>
                <button
                  type="button"
                  className={styles.backButton}
                  onClick={() => setMobileChatOpen(false)}
                  aria-label="العودة للمحادثات"
                >
                  <ArrowRight size={21} />
                </button>

                <div
                  className={`${styles.avatar} ${
                    styles[selectedConversation.color]
                  }`}
                >
                  {selectedConversation.avatar}
                  {selectedConversation.online && (
                    <span className={styles.onlineIndicator} />
                  )}
                </div>

                <div className={styles.chatContact}>
                  <h2>{selectedConversation.name}</h2>
                  <p>
                    <span
                      className={
                        selectedConversation.online
                          ? styles.onlineText
                          : styles.offlineText
                      }
                    >
                      {selectedConversation.online ? "متصل الآن" : "غير متصل"}
                    </span>
                    <span className={styles.contactSeparator}>•</span>
                    <span>دعم Joker</span>
                  </p>
                </div>

                <button
                  type="button"
                  className={styles.moreButton}
                  aria-label="خيارات المحادثة"
                  title="خيارات المحادثة"
                >
                  <MoreVertical size={21} />
                </button>
              </div>

              <div className={styles.messagesArea}>
                <div className={styles.dateDivider}>
                  <span>اليوم</span>
                </div>

                {selectedConversation.messages.map((item) => (
                  <div
                    key={item.id}
                    className={`${styles.messageRow} ${
                      item.sender === "me"
                        ? styles.myMessageRow
                        : styles.theirMessageRow
                    }`}
                  >
                    {item.sender === "them" && (
                      <div
                        className={`${styles.miniAvatar} ${
                          styles[selectedConversation.color]
                        }`}
                      >
                        {selectedConversation.avatar}
                      </div>
                    )}

                    <div
                      className={`${styles.messageBubble} ${
                        item.sender === "me"
                          ? styles.myMessage
                          : styles.theirMessage
                      }`}
                    >
                      <p>{item.text}</p>
                      <div className={styles.messageMeta}>
                        <span>{item.time}</span>
                        {item.sender === "me" && <CheckCheck size={15} />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <form className={styles.messageForm} onSubmit={sendMessage}>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="اكتب رسالتك هنا..."
                    aria-label="نص الرسالة"
                  />

                  <button
                    type="button"
                    className={styles.emojiButton}
                    aria-label="إيموجي"
                    title="الإيموجي غير متاح حاليًا"
                    disabled
                  >
                    <Smile size={20} />
                  </button>
                </div>

                <button
                  type="submit"
                  className={styles.sendButton}
                  disabled={!message.trim()}
                  aria-label="إرسال الرسالة"
                >
                  <Send size={19} />
                  <span>إرسال</span>
                </button>
              </form>

              <p className={styles.demoNote}>
                <span /> محادثة تجريبية — الرسائل مش بتتبعت لسيرفر حقيقي.
              </p>
            </>
          ) : (
            <div className={styles.noConversation}>
              <MessageCircle size={38} />
              <h2>اختاري محادثة</h2>
              <p>اختاري محادثة من القائمة علشان تبدئي التواصل.</p>
            </div>
          )}
        </main>
      </section>
    </div>
  );
}
