<script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=default'></script>
<br>
<strong> THEORY </strong>
<br>
<br>
A stability test for time invariant linear systems can also be derived in the frequency
domain. It is known as Nyquist stability criterion. It is based on the complex analysis result known as
Cauchy’s principle of argument. Note that the system transfer function is a complex function. By applying
Cauchy’s principle of argument to the open-loop system transfer function, we will get information about
stability of the closed-loop system transfer function and arrive at the Nyquist stability criterion (Nyquist,
1932). The importance of Nyquist stability lies in the fact that it can also be used to determine the
relative degree of system stability by producing the so-called phase and gain stability margins. These
stability margins are needed for frequency domain controller design techniques. <br>
We present only the essence of the Nyquist stability criterion and define the phase and gain
stability margins. The Nyquist method is used for studying the stability of linear systems with
pure time delay. For a SISO feedback system the closed-loop transfer function is given by:
<br><br>

$${T(s) = \frac{G(s)}{1+G(s)H(s)}} $$
<br>
Since the system poles are determined as those values at which its transfer function becomes
infinity, it follows that the closed-loop system poles are obtained by solving the following
equation. In the following we consider the complex function
<br><br>

$$ {D(s) = 1+G(s)H(s)} $$
<br>
whose zeros are the closed-loop poles of the transfer function. In addition, it is easy to see that
the poles of D(s) are the zeros of T(s). At the same time the poles of are the open-loop control
system poles since they are contributed by the poles of , which can be considered as the
open-loop control system transfer function—obtained when the feedback loop is open at some
point. The Nyquist stability test is obtained by applying the Cauchy principle of argument to the
complex function. First, we state Cauchy’s principle of argument. <br>
Let F(s) be an analytic function in a closed region of the complex plane except at a finite number
of points. It is also assumed that F(s) is analytic at every point on the contour. Then, as travels
around the contour in the - plane in the clockwise direction, the function F(s) encircles the origin
in the plane in the same direction N times, given by N = Z-P <br>
Where Z and P stand for the number of zeros and poles (including their multiplicities) of the
function inside the F(s) contour. <br><br>
The above result can be also written as
<br>

$$ {Arg(F(s)) = 2πN}  $$
<br>
<strong> Nyquist Criterion: </strong> It states that the number of unstable closed-loop poles is equal to the number
of unstable open-loop poles plus the number of encirclements of the origin of the Nyquist plot of
the complex function D(s). This can be easily justified by applying Cauchy’s principle of
argument to the function D(s) with the -plane contour. Note that and represent the numbers of
zeros and poles, respectively, of in the unstable part of the complex plane. At the same time, the
zeros of D(s) are the closed-loop system poles, and the poles of D(s) are the open-loop system
poles (closed-loop zeros). <br>
The above criterion can be slightly simplified if instead of plotting the function <br>

$$ { D(s) = 1+G(s)H(s)} $$
we plot only the function G(𝑠)H(𝑠) and count encirclement of the Nyquist plot of around the point
(-1+j0) , so that the modified Nyquist criterion has the following form. The number of unstable
closed-loop poles (Z) is equal to the number of unstable open-loop poles (P) plus the number of
encirclements (N) of the point (=1+j0),

$$ {Z = N + P}  $$