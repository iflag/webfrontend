import React, { useState } from "react";
import "components/feature/main-page/note/memo-list.scss";

type Memo = {
  contents: string;
};

const MemoList = () => {
  const [memos, setMemos] = useState<Memo[]>([
    {
      contents: "새로운 메모를 작성하세요!",
    },
  ]);

  return (
    <div className="memoList">
      <div className="memoList-header">
        <p className="memoList-title">Memo</p>
        <button className="memoList-addButton">
          <figure className="memoList-buttonImage" />
        </button>
      </div>
      <div className="memoList-main">
        {memos.map(
          (
            memo: Memo,
            idx: number
          ): React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLParagraphElement>,
            HTMLParagraphElement
          > => (
            <p key={idx} className="memoList-contents">
              {memo.contents}
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default MemoList;
