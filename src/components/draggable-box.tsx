"use client";
import { useState, useRef, useCallback, useEffect, type ReactNode, type RefObject } from "react";
import { motion } from "framer-motion";
import { ChevronRight, GripHorizontal } from "lucide-react";

interface DraggableBoxProps {
  id: string;
  title: ReactNode;
  content: ReactNode;
  initialX: number;
  initialY: number;
  zIndex: number;
  onBringToFront: (id: string) => void;
  containerRef: RefObject<HTMLDivElement>;
}

function DraggableBox({
  id,
  title,
  content,
  initialX,
  initialY,
  zIndex,
  onBringToFront,
  containerRef,
}: DraggableBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const constrainPosition = useCallback(
    (x: number, y: number) => {
      if (!containerRef.current || !boxRef.current) return { x, y };

      const container = containerRef.current.getBoundingClientRect();
      const box = boxRef.current.getBoundingClientRect();

      const maxX = container.width - box.width + 2;
      const maxY = container.height - box.height - 2;

      return {
        x: Math.max(0, Math.min(x, maxX)),
        y: Math.max(0, Math.min(y, maxY)),
      };
    },
    [containerRef],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current || !boxRef.current) return;

      const box = boxRef.current.getBoundingClientRect();

      // Calculate offset from mouse to box top-left corner
      const offsetX = e.clientX - box.left;
      const offsetY = e.clientY - box.top;

      setDragOffset({ x: offsetX, y: offsetY });
      setDragStartPos({ x: e.clientX, y: e.clientY });
      setIsDragging(true);
      setHasDragged(false);
      onBringToFront(id);

      e.preventDefault();
    },
    [containerRef, onBringToFront, id],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      // Calculate distance moved from start position
      const deltaX = Math.abs(e.clientX - dragStartPos.x);
      const deltaY = Math.abs(e.clientY - dragStartPos.y);
      const dragDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (dragDistance > 4) {
        setHasDragged(true);
      }

      const container = containerRef.current.getBoundingClientRect();
      // Calculate new position relative to container
      const newX = e.clientX - container.left - dragOffset.x;
      const newY = e.clientY - container.top - dragOffset.y;

      const constrainedPosition = constrainPosition(newX, newY);
      setPosition(constrainedPosition);
    },
    [isDragging, dragOffset, dragStartPos, constrainPosition, containerRef],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add global mouse event listeners when dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none";

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.userSelect = "";
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleToggleOpen = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      // Don't toggle if we just finished dragging
      if (hasDragged) {
        return;
      }

      if (!isOpen && containerRef.current && boxRef.current) {
        // Check if opening would exceed boundaries
        const container = containerRef.current.getBoundingClientRect();
        const box = boxRef.current.getBoundingClientRect();
        const content = contentRef.current.getBoundingClientRect();
        const expandedHeight = box.height + content.height;
        const maxY = container.height - expandedHeight;

        if (position.y > maxY) {
          const newY = Math.max(0, maxY);
          setPosition((prev) => ({ ...prev, y: newY }));
        }
      }

      setIsOpen(!isOpen);
      onBringToFront(id);
    },
    [hasDragged, isOpen, position.y, containerRef, onBringToFront, id],
  );

  return (
    <motion.div
      ref={boxRef}
      animate={{
        x: position.x,
        y: position.y,
        scale: isDragging ? 1.02 : 1,
      }}
      style={{
        position: "absolute",
        zIndex: zIndex,
      }}
      transition={{
        type: "spring",
        damping: isDragging ? 50 : 25,
        stiffness: isDragging ? 800 : 400,
      }}
    >
      <div
        className="flex flex-col border dark:border-zinc-600 dark:shadow-white/5 shadow-lg border-zinc-400 rounded-sm hover:shadow-xl transition-shadow"
        onClick={() => {
          onBringToFront(id);
        }}
      >
        <div
          className="flex flex-row p-4 items-center justify-between select-none cursor-move"
          onMouseDown={handleMouseDown}
          onClick={handleToggleOpen}
        >
          <div className="leading-none w-full font-semibold flex items-center gap-2">
            <GripHorizontal className="w-4 h-4 text-muted-foreground" />
            <div className="flex-1">{title}</div>
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          style={{ overflow: "hidden" }}
        >
          <div
            className="pt-0 p-4"
            ref={contentRef}
          >
            <div className=" text-muted-foreground leading-relaxed">{content}</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Function to generate random positions for boxes
function generateRandomPositions(count: number, containerWidth: number, containerHeight: number) {
  const positions = [];

  for (let i = 0; i < count; i++) {
    const maxX = Math.max(0, containerWidth);
    const maxY = Math.max(0, containerHeight);

    positions.push({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    });
  }

  return positions;
}

export function DraggableContainer({
  boxes,
}: {
  boxes: {
    id?: string;
    title: React.ReactNode;
    content: React.ReactNode;
    x?: number;
    y?: number;
  }[];
}) {
  boxes = boxes.map((b) => {
    return {
      ...b,
      id: b.id || (typeof b.title === "string" ? b.title : crypto.randomUUID()),
    };
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate random positions when component mounts
  const randomPositions = generateRandomPositions(boxes.length, 300, 500);

  const [zIndexes, setZIndexes] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    boxes.forEach((box, index) => {
      initial[box.id] = index + 1;
    });
    return initial;
  });

  const bringToFront = useCallback((id: string) => {
    setZIndexes((prev) => {
      const maxZ = Math.max(...Object.values(prev));
      return {
        ...prev,
        [id]: maxZ + 1,
      };
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-156 rounded-lg border-2 border-dashed dark:border-zinc-700 border-zinc-300 overflow-hidden"
    >
      {boxes.map((box, index) => (
        <DraggableBox
          key={box.id}
          id={box.id}
          title={box.title}
          content={box.content}
          initialX={box.x || randomPositions[index]?.x || 50}
          initialY={box.y || randomPositions[index]?.y || 50}
          zIndex={zIndexes[box.id]}
          onBringToFront={bringToFront}
          containerRef={containerRef}
        />
      ))}
    </div>
  );
}
